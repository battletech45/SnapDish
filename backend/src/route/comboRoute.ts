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

// GET routes - use req.params for clean URLs
router.get("/:id", getComboById);
router.get("/restaurant/:restaurantId", getCombosByRestaurantId);
router.get("/restaurant/:restaurantId/active", getActiveCombosByRestaurantId);
router.get("/", getAllCombos);

// POST route - use req.body for form-data
router.post("/", createCombo);
router.post("/:comboId/items", addItemToCombo);

// PUT routes - use req.params for ID, req.body for data
router.put("/:id", updateCombo);
router.patch("/:id/toggle", toggleComboActiveStatus);

// DELETE route - use req.params for ID
router.delete("/:id", deleteCombo);
router.delete("/:comboId/items/:itemId", removeItemFromCombo);

export default router;
