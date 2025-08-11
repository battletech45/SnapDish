import { Router } from "express";
import {
  getMenuById,
  getMenusByRestaurantId,
  getActiveMenusByRestaurantId,
  getAllMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  toggleMenuActiveStatus,
  addItemToMenu,
} from "../controller/menuController";

const router = Router();

// GET routes - use req.params for clean URLs
router.get("/:id", getMenuById);
router.get("/restaurant/:restaurantId", getMenusByRestaurantId);
router.get("/restaurant/:restaurantId/active", getActiveMenusByRestaurantId);
router.get("/", getAllMenus);

// POST route - use req.body for form-data
router.post("/", createMenu);
router.post("/:menuId/items", addItemToMenu);

// PUT routes - use req.params for ID, req.body for data
router.put("/:id", updateMenu);
router.patch("/:id/toggle", toggleMenuActiveStatus);

// DELETE route - use req.params for ID
router.delete("/:id", deleteMenu);

export default router;
