import express from "express";
import userRoutes from "./user.js";
import bookRoutes from "./book.js";
const router = express.Router();

router.use("/users", userRoutes);
router.use("/books", bookRoutes);

export default router;
