import express from "express";
import { create, destroy, find, findOne, update } from "../controllers/book.js";
import { verifyJWT } from "../middlewares/verifyJwt.js";
import { queryFiltersBooks } from "../middlewares/booksFilter.js";
import { checkBookInputValidation } from "../middlewares/inputValidation.js";

const router = express.Router();

router.post("/", [verifyJWT, checkBookInputValidation], create);
router.get("/", [queryFiltersBooks], find);
router.get("/:id", findOne);
router.put("/:id", [verifyJWT], update);
router.delete("/:id", [verifyJWT], destroy);

export default router;
