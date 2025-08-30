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
  getRestaurantsCountByOwner,
  getActiveRestaurantsCountByOwner,
} from "../controller/restaurantController";

const router = Router();

// POST routes
router.post("/", createRestaurant);

// GET routes
router.get("/franchise/:franchiseId", getAllRestaurants);
router.get("/franchise/:franchiseId/active", getAllActiveRestaurants);
router.get("/franchise/:franchiseId/:id", getRestaurantById);

router.get("/owner/:ownerId", getRestaurantsByOwnerId);
router.get("/owner/:ownerId/active", getActiveRestaurantsByOwnerId);
router.get(
  "/franchise/:franchiseId/owner/:ownerId/count",
  getRestaurantsCountByOwner
);
router.get(
  "/franchise/:franchiseId/owner/:ownerId/active-count",
  getActiveRestaurantsCountByOwner
);
router.get("/name/:name", getRestaurantsByName);

// PUT routes
router.put("/franchise/:franchiseId/:id", updateRestaurant);

// PATCH routes
router.patch(
  "/franchise/:franchiseId/:id/toggle",
  toggleRestaurantActiveStatus
);

// DELETE routes
router.delete("/franchise/:franchiseId/:id", deleteRestaurant);

export default router;
