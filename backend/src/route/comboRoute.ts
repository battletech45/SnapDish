import { Router } from "express";
import {
  getComboById,
  getCombosByRestaurantId,
  getActiveCombosByRestaurantId,
  getAllCombos,
  createCombo,
  updateCombo,
  deleteCombo,
  toggleComboActiveStatus,
  addItemToCombo,
  removeItemFromCombo,
} from "../controller/comboController";

const router = Router();

// GET routes
router.get("/", getAllCombos);
router.get("/restaurant/:restaurantId/active", getActiveCombosByRestaurantId);
router.get("/restaurant/:restaurantId", getCombosByRestaurantId);
router.get("/:id", getComboById);

// POST routes
router.post("/", createCombo);
router.post("/:comboId/items", addItemToCombo);

// PUT/PATCH routes
router.put("/:id", updateCombo);
router.patch("/:id/toggle", toggleComboActiveStatus);

// DELETE routes
router.delete("/:id", deleteCombo);
router.delete("/:comboId/items/:itemId", removeItemFromCombo);

export default router;
