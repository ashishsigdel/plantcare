import { Readable } from "stream";
import cloudinary from "../config/cloudinaryConfig.js";

export const getImageURL = async ({ buffer, originalname, mimetype }) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "ashishsigdel-web",
        resource_type: "auto",
        public_id: originalname.split(".")[0],
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
