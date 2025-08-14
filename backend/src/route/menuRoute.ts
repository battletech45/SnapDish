import { Router } from "express";
import {
  getMenuById,
  getMenusByRestaurantId,
  getActiveMenusByRestaurantId,
  getMenusByCategory,
  getAllMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  toggleMenuActiveStatus,
  addItemToMenu,
  removeItemFromMenu,
  addComboToMenu,
  removeComboFromMenu,
} from "../controller/menuController";

const router = Router();

// GET routes - use req.params for clean URLs
router.get("/:id", getMenuById);
router.get("/restaurant/:restaurantId", getMenusByRestaurantId);
router.get("/restaurant/:restaurantId/active", getActiveMenusByRestaurantId);
router.get("/restaurant/:restaurantId/category/:category", getMenusByCategory);
router.get("/", getAllMenus);

// POST route - use req.body for form-data
router.post("/", createMenu);
router.post("/:menuId/items", addItemToMenu);
router.post("/:menuId/combos", addComboToMenu);

// PUT routes - use req.params for ID, req.body for data
router.put("/:id", updateMenu);
router.patch("/:id/toggle", toggleMenuActiveStatus);

// DELETE route - use req.params for ID
router.delete("/:id", deleteMenu);
router.delete("/:menuId/items/:itemId", removeItemFromMenu);
router.delete("/:menuId/combos/:comboId", removeComboFromMenu);

export default router;
