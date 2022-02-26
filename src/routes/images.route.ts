/**
 *
 * RUTA: '/api/image'
 *
 */

import express from "express";
import { check } from "express-validator";

import controller from "../controllers/images.controller";
import validate_data from "../middlewares/validate_data";
import validate_jwt from "../middlewares/validate_jwt";
const router = express.Router();

router.get("/images/:id", validate_jwt, controller.getImagesByUserId);

router.post(
  "/url",
  [
    validate_jwt,
    check("image_url", "The url is required").not().isEmpty().isURL(),
    check("label", "Label is required").not().isEmpty(),
    validate_data,
  ],
  controller.createImageUrl
);

router.delete("/:id", controller.deleteImage);

export = router;
