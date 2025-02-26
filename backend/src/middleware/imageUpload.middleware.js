import multer from "multer";
import sharp from "sharp";

// Configure multer to store files in memory
const storage = multer.memoryStorage();
export const upload = multer({ storage }); // ✅ Ensure this is exported

// Middleware to process and compress image before uploading
export const uploadAndCompressImage = async (req, res, next) => {
  if (!req.file) {
    return next(); // If no file, continue without processing
  }

  try {
    // Compress and resize image
    const compressedBuffer = await sharp(req.file.buffer)
      .resize({ width: 400 }) // Resize image to max width of 800px
      .jpeg({ quality: 60 }) // Reduce JPEG quality to 60%
      .toBuffer();

    // Ensure image is under 100KB
    if (compressedBuffer.length > 80 * 1024) {
      req.file.buffer = await sharp(compressedBuffer)
        .jpeg({ quality: 40 }) // Reduce quality further
        .toBuffer();
    } else {
      req.file.buffer = compressedBuffer;
    }

    next(); // Pass modified file to controller
  } catch (error) {
    console.error("Error compressing image:", error);
    return res.status(500).json({ message: "Error processing image." });
  }
};
