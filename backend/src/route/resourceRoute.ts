import { Router } from "express";
import {
  createResourceHandler,
  getResourcesByRestaurantHandler,
  getResourceByIdHandler,
  updateResourceHandler,
  deleteResourceHandler,
  updateResourceStockHandler,
  getLowStockResourcesHandler,
  getResourceStockHistoryHandler,
  bulkUpdateResourceStockHandler,
  getResourcesWithStatsHandler,
} from "../controller/resourceController";

const router = Router();

// Create a new resource
router.post("/", createResourceHandler);

// Get all resources for a restaurant
router.get("/restaurant/:restaurantId", getResourcesByRestaurantHandler);

// Get resources with statistics
router.get("/restaurant/:restaurantId/stats", getResourcesWithStatsHandler);

// Get low stock resources for a restaurant
router.get("/restaurant/:restaurantId/low-stock", getLowStockResourcesHandler);

// Get resource by ID
router.get("/:id", getResourceByIdHandler);

// Get resource stock history
router.get("/:id/history", getResourceStockHistoryHandler);

// Update resource
router.put("/:id", updateResourceHandler);

// Update resource stock
router.patch("/:id/stock", updateResourceStockHandler);

// Bulk update resource stock
router.patch("/bulk-stock", bulkUpdateResourceStockHandler);

// Delete resource
router.delete("/:id", deleteResourceHandler);

export default router;
