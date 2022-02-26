/**
 *
 * RUTA: '/api/users'
 *
 */

import express from "express";
import { check } from "express-validator";

import controller from "../controllers/users.controller";
import validate_data from "../middlewares/validate_data";
const router = express.Router();

router.get("/user/:id", controller.getUserById);

router.post(
  "/create",
  [
    check("email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check(
      "password",
      "The password must be greater than 8 characters"
    ).isLength({ min: 8 }),
    validate_data,
  ],
  controller.createUser
);

export = router;
