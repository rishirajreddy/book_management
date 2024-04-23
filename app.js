import express from "express";
import { port } from "./config/env.js";
import { connectDB } from "./src/services/database.js";
import router from "./src/routes/index.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/api", router);
const PORT = port;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
