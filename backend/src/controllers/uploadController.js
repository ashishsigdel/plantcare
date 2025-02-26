import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getImageURL } from "../utils/fileUpload.js";
import ApiError from "../utils/apiError.js";
import { uploadbase64Image } from "../utils/fileUpload.js";
import axios from "axios";
import db from "../models/index.js";

const {
  Upload,
  Disease,
  DiseaseDescription,
  DiseasePrevention,
  DiseaseSymptom,
  DiseaseCure,
  Audio,
  Report,
  User,
} = db;

const modelOptToDbMap = {
  alternaria_leaf_spot: "Alternaria Leaf Spot",
  black_rot: "Black Rot",
  downey_mildew: "Downey Mildew",
  insect_infested: "Insect Infested",
  nutrient_deficiency: "Nutrient Deficiency",
};

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError({
      status: 400,
      message: "No file uploaded!",
    });
  }

  const u = res.locals.user;

  let publicUrl;
  try {
    publicUrl = await getImageURL({
      buffer: req.file.buffer,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    throw new ApiError({
      status: 500,
      message: "Error uploading file to cloud.",
    });
  }

  const upload = await Upload.create({
    url: publicUrl,
    userId: u.id,
  });

  let detectedDisesase = {};
  let diseasefound;

  try {
    const blob = new Blob([req.file.buffer], { type: req.file.mimetype });

    const formData = new FormData();
    formData.append("image", blob, req.file.originalname);

    const flaskResponse = await axios.post(
      "http://localhost:5001/predict",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    const resdata = flaskResponse.data;

    diseasefound = resdata.detections[0]?.disease;
    try {
      const cloudres = await uploadbase64Image(resdata.annotated_image);
      detectedDisesase.pattern = cloudres;
    } catch (error) {
      console.log(error);
      throw new ApiError({
        status: 502,
        message: "Error in uploading image. Try again later.",
      });
    }
  } catch (error) {
    console.log(error);
    throw new ApiError({
      status: 502,
      message: "Error in inference server. Try again later.",
    });
  }
  try {
    detectedDisesase.plant = "Cauliflower";
    detectedDisesase.name = modelOptToDbMap[diseasefound];
  } catch (error) {
    throw new ApiError({
      status: 403,
      message: "Error while detecting. Try again later.",
    });
  }
  if (!diseasefound) {
    let responseData = {
      plant: {
        name: detectedDisesase.plant,
        plantUrl: upload.url,
        reportPatternUrl: detectedDisesase.pattern,
      },
      disease: [], // Change as per what to show if no disease is found.
    };

    return new ApiResponse({
      status: 200,
      message: "Image uploaded.",
      data: responseData,
    }).send(res);
  }

  const disease = await Disease.findOne({
    where: {
      name: detectedDisesase.name,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: DiseaseDescription,
        as: "diseaseDescription",
        attributes: ["descriptionEn", "descriptionNP"],
        include: [
          { model: Audio, as: "enAudio", attributes: ["url"] },
          { model: Audio, as: "npAudio", attributes: ["url"] },
        ],
      },
      {
        model: DiseaseSymptom,
        as: "diseaseSymptom",
        attributes: ["symptomsEn", "symptomsNP"],
        include: [
          { model: Audio, as: "enAudio", attributes: ["url"] },
          { model: Audio, as: "npAudio", attributes: ["url"] },
        ],
      },
      {
        model: DiseasePrevention,
        as: "diseasePrevention",
        attributes: ["preventionsEn", "preventionsNP"],

        include: [
          { model: Audio, as: "enAudio", attributes: ["url"] },
          { model: Audio, as: "npAudio", attributes: ["url"] },
        ],
      },
      {
        model: DiseaseCure,
        as: "diseaseCure",
        attributes: ["curesEn", "curesNP"],
        include: [
          { model: Audio, as: "enAudio", attributes: ["url"] },
          { model: Audio, as: "npAudio", attributes: ["url"] },
        ],
      },
    ],
  });

  await Report.create({
    userId: u.id,
    uploadId: upload.id,
    diseaseId: disease.id,
    reportPatternUrl: detectedDisesase.pattern,
  });

  let responseData = {
    plant: {
      name: detectedDisesase.plant,
      plantUrl: upload.url,
      reportPatternUrl: detectedDisesase.pattern,
    },
    disease,
  };

  return new ApiResponse({
    status: 200,
    message: "Image uploaded.",
    data: responseData,
  }).send(res);
});
