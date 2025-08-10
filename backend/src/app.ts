import express from "express";
import dotenv from "dotenv";
import logger from "./util/logger";
import morgan from "morgan";
import authRoute from "./route/authRoute";

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 3000;

app.use(express.json());

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
