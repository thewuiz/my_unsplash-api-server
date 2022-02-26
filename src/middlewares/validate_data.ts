import { Request, Response } from "express";
import { validationResult } from "express-validator"; //Resultado de la validacion

const validate_data = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({
    errors: errors.mapped(),
  });
};

export = validate_data;
