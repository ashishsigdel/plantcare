import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getImageURL, uploadImageFromUrl } from "../utils/fileUpload.js";
import ApiError from "../utils/apiError.js";
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
    userId: 2,
  });

  let detectedDisesase = {};
  let diseasefound;
  let cloudres;

  try {
    const response = await axios.post(
      "https://ashishsigdel-plantcare-inference.hf.space/gradio_api/call/predict",
      {
        data: [
          {
            path: publicUrl,
            meta: {
              _type: "gradio.FileData",
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resultData = await axios.get(
      `https://ashishsigdel-plantcare-inference.hf.space/gradio_api/call/predict/${response.data.event_id}`
    );

    const jsonLine = resultData.data.split("data: ")[1].trim();
    const parsedData = JSON.parse(jsonLine);

    const annotatedImageUrl = parsedData[0]?.url;

    const detectionsText = parsedData[1] || "";
    const detectionsArray = detectionsText
      .split("\n")
      .map((line) => {
        const [disease, conf] = line.split(":");
        return {
          disease: disease.trim(),
          confidence: parseFloat(conf),
        };
      })
      .filter((d) => !isNaN(d.confidence));

    const topDetection = detectionsArray.sort(
      (a, b) => b.confidence - a.confidence
    )[0];
    diseasefound = topDetection?.disease;

    try {
      cloudres = await uploadImageFromUrl(annotatedImageUrl);
    } catch (error) {
      console.log(error);
      throw new ApiError({
        status: 502,
        message: "Error in uploading image. Try again later.",
      });
    }
  } catch (error) {
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
        reportPatternUrl: cloudres,
      },
      disease: null,
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

  const report = await Report.create({
    userId: u.id,
    uploadId: upload.id,
    diseaseId: disease.id,
    reportPatternUrl: cloudres,
  });
  console.log(report);

  let responseData = {
    plant: {
      name: detectedDisesase.plant,
      plantUrl: upload.url,
      reportPatternUrl: cloudres,
    },
    disease,
  };
  console.log(responseData);

  return new ApiResponse({
    status: 200,
    message: "Image uploaded.",
    data: responseData,
  }).send(res);
});
