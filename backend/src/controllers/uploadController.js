import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getImageURL } from "../utils/fileUpload.js";
import ApiError from "../utils/apiError.js";

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
    userId: u.id,
    url: publicUrl,
  });

  let detectedDisesase;
  //call api for disesase detect to AI model later
  try {
    detectedDisesase = {
      plant: "Cauliflower",
      name: "Black Rot",
      patter: upload.url,
    };
  } catch (error) {
    throw new ApiError({
      status: 403,
      message: "Error while detecting. Try again later.",
    });
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
    reportPatternUrl: upload.url, // change here later
  });

  let responseData = {
    plant: {
      name: detectedDisesase.plant,
      plantUrl: upload.url,
      reportPatternUrl: upload.url, // chage here later
    },
    disease,
  };

  return new ApiResponse({
    status: 200,
    message: "Image uploaded.",
    data: responseData,
  }).send(res);
});
