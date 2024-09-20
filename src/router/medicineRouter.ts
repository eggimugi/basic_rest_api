import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../controller/medicineController";
import { createValidation, updateValidation } from "../middleware/medicineValidation";
import { uploadMedicinePhoto } from "../middleware/uploadMedicinePhoto";
const router = Router();

// Route for add new medicine
// .single: yang diupload hanya satu file saja
router.post(`/`, [uploadMedicinePhoto.single(`photo`), createValidation], createMedicine);

// route for show all medicine
router.get(`/`, readMedicine);

// route for update medicine
// /:id = diisi dengan tempat "id" yang mau diubah
router.put(`/:id`, [uploadMedicinePhoto.single(`photo`), updateValidation], updateMedicine);

// route for remove medicine
router.delete(`/:id`, deleteMedicine);

export default router;
