import { Readable } from "stream";
import cloudinary from "../config/cloudinaryConfig.js";

export const getImageURL = async ({ buffer, originalname, mimetype }) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "plantcare-web",
        resource_type: "auto",
        public_id: originalname.split(".")[0] + Date.now(),
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url || "");
        }
      }
    );

    const stream = Readable.from(buffer);
    stream.pipe(uploadStream);
  });
};

export const uploadbase64Image = async (base64Image) => {
  try {
    const base64String = base64Image.startsWith("data:image/")
      ? base64Image
      : `data:image/png;base64,${base64Image}`;
    const result = await cloudinary.uploader.upload(base64String, {
      resource_type: "image",
    });

    return result.secure_url || "";
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

export const uploadImageFromUrl = async (imageUrl) => {
  const result = await cloudinary.uploader.upload(imageUrl, {
    folder: "plantcare_result",
  });
  return result.secure_url;
};
