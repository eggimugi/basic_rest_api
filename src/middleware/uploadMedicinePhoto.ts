import multer from "multer";
import { Request } from "express";
import { ROOT_DIRECTORY } from "../config";
import { error } from "console";

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

// define function to filtering file
const filterFile = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  // define allowed extensions
  const allowedFile = /png|jpg|jpeg|gif/;
  // check extension of uploade file
  const isAllowed = allowedFile.test(file.mimetype);

  if (isAllowed) {
    callback(null, true);
  } else {
    callback(new Error(`Your file is not allowed to uploaded`));
  }
};

const uploadMedicinePhoto = multer({
  storage,
  fileFilter: filterFile,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2Mb
});

export { uploadMedicinePhoto };
