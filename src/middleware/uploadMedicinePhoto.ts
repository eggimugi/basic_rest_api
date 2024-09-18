import multer from "multer";
import { Request } from "express";
import { ROOT_DIRECTORY } from "../config";

// define storage to save uploaded file
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
    const storagePath = `${ROOT_DIRECTORY}/public/medicine-photo`;

    callback(null, storagePath);
  },
  filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
    const fileName = `${Math.random()}_${file.originalname}`;

    callback(null, fileName);
  },
});

const uploadMedicinePhoto = multer({
  storage,
});

export { uploadMedicinePhoto };
