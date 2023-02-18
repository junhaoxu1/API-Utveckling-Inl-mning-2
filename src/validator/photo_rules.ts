import { body } from "express-validator";

export const createPhotoRules = [
  body("title")
    .isString()
    .withMessage("Not a String")
    .bail()
    .isLength({ min: 1 }),

  body("url")
    .isString()
    .withMessage("Not a String")
    .bail()
    .isURL()
    .withMessage("Not a URL")
    .isLength({ min: 1 }),

  body("comment").optional().bail(),
];
