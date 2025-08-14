import { Router } from "express";
import {
  createRestaurant,
  getRestaurantById,
  getRestaurantsByOwnerId,
  getActiveRestaurantsByOwnerId,
  getRestaurantsByName,
  getAllRestaurants,
  getAllActiveRestaurants,
  updateRestaurant,
  deleteRestaurant,
  toggleRestaurantActiveStatus,
  checkRestaurantOwnership,
  getRestaurantsCountByOwner,
  getActiveRestaurantsCountByOwner,
  searchRestaurants,
  getRestaurantsWithStats,
  bulkUpdateRestaurants,
} from "../controller/restaurantController";

const router = Router();

// POST routes
router.post("/", createRestaurant);

// GET routes
router.get("/", getAllRestaurants);
router.get("/active", getAllActiveRestaurants);
router.get("/search", searchRestaurants);
router.get("/stats", getRestaurantsWithStats);
router.get("/:id", getRestaurantById);
router.get("/owner/:ownerId", getRestaurantsByOwnerId);
router.get("/owner/:ownerId/active", getActiveRestaurantsByOwnerId);
router.get("/owner/:ownerId/count", getRestaurantsCountByOwner);
router.get("/owner/:ownerId/active-count", getActiveRestaurantsCountByOwner);
router.get("/name/:name", getRestaurantsByName);
router.get("/:restaurantId/owner/:userId", checkRestaurantOwnership);

// PUT routes
router.put("/:id", updateRestaurant);
router.put("/bulk", bulkUpdateRestaurants);

// PATCH routes
router.patch("/:id/toggle", toggleRestaurantActiveStatus);

// DELETE routes
router.delete("/:id", deleteRestaurant);

export default router;
