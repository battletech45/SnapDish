import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import apiRoute from "./route/apiRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const upload = multer();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());
app.use(morgan("combined"));

// Routes
app.use("/api", apiRoute);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
