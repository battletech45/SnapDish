import express from "express";
import dotenv from "dotenv";
import logger from "./util/logger";
import morgan from "morgan";
import multer from "multer";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { analyticsMiddleware } from "./middleware/analyticsMiddleware";
import apiRoute from "./route/apiRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Analytics middleware (add before routes)
app.use(analyticsMiddleware);

// Routes
app.use("/api", apiRoute);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;
