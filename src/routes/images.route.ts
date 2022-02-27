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

router.get("/images", validate_jwt, controller.getAllImages);

router.get("/search", validate_jwt, controller.getImagesBySearch);

router.post(
  "/url",
  [
    validate_jwt,
    check("image_url", "The url is required").not().isEmpty().isURL(),
    check("label", "Label is required").not().isEmpty(),
    check("label", "The maximum is 50 characters").isLength({ max: 50 }),
    validate_data,
  ],
  controller.createImageUrl
);

router.delete("/:id", controller.deleteImage);

export = router;
