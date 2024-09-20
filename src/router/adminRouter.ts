import { Router } from "express";
import { createAdmin, deleteAdmin, readAdmin, updateAdmin } from "../controller/adminController";
import { createAdminValidation, updateAdminValidation } from "../middleware/adminValidation";

const router = Router();

router.post(`/`, [createAdminValidation], createAdmin);
router.get(`/`, readAdmin);
router.put(`/:id`, [updateAdminValidation], updateAdmin);
router.delete(`/:id`, deleteAdmin);

export default router;
