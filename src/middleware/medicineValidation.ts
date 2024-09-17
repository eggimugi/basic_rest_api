import { NextFunction, Request, Response } from "express";
import Joi, { string } from "joi";

// create a schema for add new medicine
const createSchema = Joi.object({
  name: Joi.string().required(),
  stock: Joi.number().min(0).required(),
  price: Joi.number().min(1).required(),
  exp_date: Joi.date().required(),
  type: Joi.string().valid("Syrup", "Tablet", "Powder").required(),
});

const createValidation = (req: Request, res: Response, next: NextFunction) => {
  const validate = createSchema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: validate.error.details.map((it) => it.message).join(),
    });
  }
  next();
};

// create a schema for change medicine
const updateSchema = Joi.object({
  name: Joi.string().optional(),
  stock: Joi.number().min(0).optional(),
  price: Joi.number().min(1).optional(),
  exp_date: Joi.date().optional(),
  type: Joi.string().valid("Syrup", "Tablet", "Powder").optional(),
});

const updateValidation = (req: Request, res: Response, next: NextFunction) => {
  const validate = updateSchema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: validate.error.details.map((it) => it.message).join(),
    });
  }
  next();
};

export { createValidation, updateValidation };

// jika yang diimpor menggunakan {} maka export juga menggunakan {}, jika tidak juga tidak
