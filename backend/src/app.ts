import express from "express";
import dotenv from "dotenv";
import logger from "./util/logger";
import morgan from "morgan";
import authRoute from "./route/authRoute";
import multer from "multer";

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 3000;
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
