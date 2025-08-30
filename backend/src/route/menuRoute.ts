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

// GET routes
router.get("/", getAllMenus);
router.get("/restaurant/:restaurantId/category/:category", getMenusByCategory);
router.get("/restaurant/:restaurantId/active", getActiveMenusByRestaurantId);
router.get("/restaurant/:restaurantId", getMenusByRestaurantId);
router.get("/:id", getMenuById);

// POST routes
router.post("/", createMenu);
router.post("/:menuId/items", addItemToMenu);
router.post("/:menuId/combos", addComboToMenu);

// PUT/PATCH routes
router.put("/:id", updateMenu);
router.patch("/:id/toggle", toggleMenuActiveStatus);

// DELETE routes
router.delete("/:id", deleteMenu);
router.delete("/:menuId/items/:itemId", removeItemFromMenu);
router.delete("/:menuId/combos/:comboId", removeComboFromMenu);

export default router;
