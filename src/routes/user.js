import express from "express";
import {
  create,
  destroy,
  find,
  findOne,
  login,
  update,
} from "../controllers/user.js";
import { verifyJWT } from "../middlewares/verifyJwt.js";
import { checkUserPermission } from "../middlewares/userValidation.js";
import { checkUserInputValidation } from "../middlewares/inputValidation.js";

const router = express.Router();

router.post("/", [checkUserInputValidation], create);
router.get("/", [verifyJWT], find);
router.get("/:id", [verifyJWT], findOne);
router.put("/:id", [verifyJWT, checkUserPermission], update);
router.delete("/:id", [verifyJWT, checkUserPermission], destroy);
router.post("/auth/login", login);

export default router;
