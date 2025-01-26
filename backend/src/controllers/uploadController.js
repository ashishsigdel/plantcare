import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getImageURL } from "../utils/fileUpload.js";

import db from "../models/index.js";

const { Upload, Disease } = db;

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError({
      status: 400,
      message: "No file uploaded!",
    });
  }

  const user = req.user;

  if (!user) {
    throw new ApiError({
      status: 401,
      message: "Please login first!",
    });
  }

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
    userId: user.id,
    url: publicUrl,
  });

  let detectedDisesase;
  //call api for disesase detect
  try {
    detectedDisesase = {
      name: "Black Rot",
    };
  } catch (error) {
    console.log(error);
  }

  let responseData = {
    plantImage: {
      id: upload.id,
      url: upload.url,
      name: detectedDisesase,
    },
    disease: await Disease.findOne({
      where: {
        name: detectedDisesase.name,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    }),
  };

  return new ApiResponse({
    status: 200,
    message: "Image uploaded.",
    data: responseData,
  }).send(res);
});
