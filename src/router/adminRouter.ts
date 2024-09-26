import { Router } from "express";
import { authentication, createAdmin, deleteAdmin, readAdmin, updateAdmin } from "../controller/adminController";
import { authValidation, createAdminValidation, updateAdminValidation } from "../middleware/adminValidation";

const router = Router();

router.post(`/`, [createAdminValidation], createAdmin);
router.get(`/`, readAdmin);
router.put(`/:id`, [updateAdminValidation], updateAdmin);
router.delete(`/:id`, deleteAdmin);
router.post(`/auth`, [authValidation], authentication);

export default router;
