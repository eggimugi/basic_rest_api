import Joi from "joi";
import { ROOT_DIRECTORY } from "../config";
import { NextFunction, Request, Response } from "express";

const createAdminSchema = Joi.object({
  admin_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const createAdminValidation = (req: Request, res: Response, next: NextFunction) => {
  const validate = createAdminSchema.validate(req.body);
  next();
};

const updateAdminSchema = Joi.object({
  admin_name: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
});

const updateAdminValidation = (req: Request, res: Response, next: NextFunction) => {
  const validate = updateAdminSchema.validate(req.body);
  next();
};

export { createAdminValidation, updateAdminValidation };
