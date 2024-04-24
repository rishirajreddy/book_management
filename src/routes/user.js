import express from "express";
import { create, destroy, find, findOne, update } from "../controllers/user.js";

const router = express.Router();

router.post("/", create);
router.get("/", find);
router.get("/:id", findOne);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
