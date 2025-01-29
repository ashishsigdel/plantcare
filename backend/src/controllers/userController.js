import db from "../models/index.js";
import { Op } from "sequelize";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { subDays } from "date-fns";

const {
  User,
  Report,
  Upload,
  Disease,
  DiseaseDescription,
  DiseasePrevention,
  DiseaseSymptom,
  DiseaseCure,
  Audio,
} = db;

export const fetchHistory = asyncHandler(async (req, res) => {
  const u = res.locals.user;
  if (!u || !u.id) {
    throw new ApiError({
      status: 401,
      message: "User not authenticated or missing ID",
    });
  }

  const till = parseInt(req.query.till);

  let dateFrom;

  if (till) {
    dateFrom = subDays(new Date(), till);
  }

  const history = await Report.findAll({
    where: {
      userId: u.id,
      ...(dateFrom && { createdAt: { [Op.gte]: dateFrom } }),
    },
    attributes: ["id", "createdAt"],
    include: [
      {
        model: Disease,
        as: "disease",
        attributes: ["name"],
      },
      {
        model: Upload,
        as: "upload",
        attributes: ["url", "id"],
      },
    ],
    order: [["id", "DESC"]],
  });

  return new ApiResponse({
    status: 200,
    data: history,
  }).send(res);
});

export const fetchHistoryDetail = asyncHandler(async (req, res) => {
  const { uploadId } = req.params;
  const u = res.locals.user;

  const upload = await Upload.findByPk(uploadId);

  if (!upload) {
    throw new ApiError({
      status: 404,
      message: "Record not found!",
    });
  }

  const report = await Report.findOne({
    where: {
      uploadId: uploadId,
      userId: u.id,
    },
  });

  if (!report) {
    throw new ApiError({
      status: 404,
      message: "Report not found!",
    });
  }

  const disease = await Disease.findOne({
    where: {
      id: report.diseaseId,
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

  let responseData = {
    plant: {
      name: "Cauliflower",
      plantUrl: upload.url,
      reportPatternUrl: report.reportPatternUrl,
    },
    disease,
  };

  return new ApiResponse({
    status: 200,
    data: {
      responseData,
    },
  }).send(res);
});
