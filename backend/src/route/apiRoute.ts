import express from "express";
import menuRoute from "./menuRoute";
import itemRoute from "./itemRoute";
import authRoute from "./authRoute";
import restaurantRoute from "./restaurantRoute";
import comboRoute from "./comboRoute";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/menu", menuRoute);
router.use("/item", itemRoute);
router.use("/restaurant", restaurantRoute);
router.use("/combo", comboRoute);

export default router;
