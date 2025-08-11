import { Router } from "express";
import {
  getItemById,
  getItemsByMenuId,
  getAvailableItemsByMenuId,
  getItemsByCategory,
  getItemsByRestaurantId,
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  toggleItemAvailability,
} from "../controller/itemController";

const router = Router();

// GET routes - use req.params for clean URLs
router.get("/:id", getItemById);
router.get("/menu/:menuId", getItemsByMenuId);
router.get("/menu/:menuId/available", getAvailableItemsByMenuId);
router.get("/category/:category", getItemsByCategory);
router.get("/restaurant/:restaurantId", getItemsByRestaurantId);
router.get("/", getAllItems);

// POST route - use req.body for form-data
router.post("/", createItem);

// PUT routes - use req.params for ID, req.body for data
router.put("/:id", updateItem);
router.put("/:id/toggle", toggleItemAvailability);

// DELETE route - use req.params for ID
router.delete("/:id", deleteItem);

export default router;
