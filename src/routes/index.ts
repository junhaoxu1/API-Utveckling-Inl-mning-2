import express from "express";
import { register, login, refresh } from "../controllers/user_controller";
import { createUserRules } from "../validator/user_rules";
import { createPhotoRules } from "../validator/photo_rules"
import { createAlbumRules } from "../validator/album_rules";
import photos from "./photos";
import albums from "./albums";
import { validateToken } from "../middlewares/auth/jwt";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    message: "Make Sure To Register And Login before accessing Albums and Photos",
  });
});

router.use("/photos", createPhotoRules, validateToken, photos);

router.use("/albums", createAlbumRules , validateToken, albums);

router.post("/register", createUserRules, register);

router.post("/login", login);

router.post("/refresh", refresh);

export default router;
