import { Request, Response } from "express";
import * as restaurantModel from "../model/restaurantModel";
import { apiResponse } from "../util/apiResponse";
import { Restaurant } from "../type/restaurantType";

// Create a new restaurant - POST method
export const createRestaurant = async (req: Request, res: Response) => {
  const {
    franchiseId,
    name,
    description,
    address,
    phoneNumber,
    email,
    imageUrl,
    ownerId,
    isActive,
  } = req.body;

  // Validation
  if (!name || !ownerId) {
    return apiResponse.validationError(res, "Name and ownerId are required");
  }

  // Convert isActive to boolean if it's a string
  let isActiveBool: boolean = true; // Default value
  if (isActive !== undefined) {
    if (typeof isActive === "string") {
      isActiveBool = isActive.toLowerCase() === "true";
    } else if (typeof isActive === "boolean") {
      isActiveBool = isActive;
    } else {
      return apiResponse.validationError(
        res,
        "isActive must be a boolean or string 'true'/'false'"
      );
    }
  }

  try {
    const restaurantData = {
      name,
      description,
      address,
      phoneNumber,
      email,
      imageUrl,
      ownerId,
      isActive: isActiveBool,
    };

    const newRestaurant = await restaurantModel.createRestaurantUnderFranchise(
      franchiseId,
      restaurantData as unknown as Restaurant
    );
    return apiResponse.created(
      res,
      newRestaurant,
      "Restaurant created successfully"
    );
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return apiResponse.internalError(res, "Failed to create restaurant");
  }
};

// Get restaurant by ID - GET method
export const getRestaurantById = async (req: Request, res: Response) => {
  const { franchiseId, id } = req.params;

  if (!id) {
    return apiResponse.validationError(res, "Restaurant ID is required");
  }

  try {
    const restaurant = await restaurantModel.findRestaurantByIdInFranchise(
      franchiseId,
      id
    );
    if (!restaurant) {
      return apiResponse.notFound(res, "Restaurant not found");
    }

    return apiResponse.success(
      res,
      restaurant,
      "Restaurant retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting restaurant by ID:", error);
    return apiResponse.internalError(res, "Failed to get restaurant");
  }
};

// Get restaurants by owner ID - GET method
export const getRestaurantsByOwnerId = async (req: Request, res: Response) => {
  const { ownerId } = req.params;

  if (!ownerId) {
    return apiResponse.validationError(res, "Owner ID is required");
  }

  try {
    const restaurants = await restaurantModel.findRestaurantsInFranchise(
      ownerId
    );
    return apiResponse.success(
      res,
      restaurants,
      "Restaurants retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting restaurants by owner ID:", error);
    return apiResponse.internalError(res, "Failed to get restaurants");
  }
};

// Get active restaurants by owner ID - GET method
export const getActiveRestaurantsByOwnerId = async (
  req: Request,
  res: Response
) => {
  const { ownerId } = req.params;

  if (!ownerId) {
    return apiResponse.validationError(res, "Owner ID is required");
  }

  try {
    const restaurants = await restaurantModel.findActiveRestaurantsInFranchise(
      ownerId
    );
    return apiResponse.success(
      res,
      restaurants,
      "Active restaurants retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting active restaurants by owner ID:", error);
    return apiResponse.internalError(res, "Failed to get active restaurants");
  }
};

// Get restaurants by name - GET method
export const getRestaurantsByName = async (req: Request, res: Response) => {
  const { name } = req.params;

  if (!name) {
    return apiResponse.validationError(res, "Restaurant name is required");
  }

  try {
    const restaurants = await restaurantModel.findRestaurantsInFranchise(name);
    return apiResponse.success(
      res,
      restaurants,
      "Restaurants retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting restaurants by name:", error);
    return apiResponse.internalError(res, "Failed to get restaurants");
  }
};

// Get all restaurants - GET method
export const getAllRestaurants = async (req: Request, res: Response) => {
  const { franchiseId } = req.params;
  try {
    const restaurants = await restaurantModel.findRestaurantsInFranchise(
      franchiseId
    );
    return apiResponse.success(
      res,
      restaurants,
      "All restaurants retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting all restaurants:", error);
    return apiResponse.internalError(res, "Failed to get restaurants");
  }
};

// Get all active restaurants - GET method
export const getAllActiveRestaurants = async (req: Request, res: Response) => {
  const { franchiseId } = req.params;
  try {
    const restaurants = await restaurantModel.findActiveRestaurantsInFranchise(
      franchiseId
    );
    return apiResponse.success(
      res,
      restaurants,
      "All active restaurants retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting all active restaurants:", error);
    return apiResponse.internalError(res, "Failed to get active restaurants");
  }
};

// Update restaurant - PUT method
export const updateRestaurant = async (req: Request, res: Response) => {
  const { franchiseId, id } = req.params;
  const {
    name,
    description,
    address,
    phoneNumber,
    email,
    imageUrl,
    ownerId,
    isActive,
  } = req.body;

  if (!id) {
    return apiResponse.validationError(res, "Restaurant ID is required");
  }

  // Validation
  if (name !== undefined && typeof name !== "string") {
    return apiResponse.validationError(res, "Name must be a string");
  }

  if (description !== undefined && typeof description !== "string") {
    return apiResponse.validationError(res, "Description must be a string");
  }

  if (address !== undefined && typeof address !== "string") {
    return apiResponse.validationError(res, "Address must be a string");
  }

  if (phoneNumber !== undefined && typeof phoneNumber !== "string") {
    return apiResponse.validationError(res, "Phone number must be a string");
  }

  if (email !== undefined && typeof email !== "string") {
    return apiResponse.validationError(res, "Email must be a string");
  }

  if (imageUrl !== undefined && typeof imageUrl !== "string") {
    return apiResponse.validationError(res, "Image URL must be a string");
  }

  if (ownerId !== undefined && typeof ownerId !== "string") {
    return apiResponse.validationError(res, "Owner ID must be a string");
  }

  // Convert isActive to boolean if it's a string
  let isActiveBool: boolean | undefined = undefined;
  if (isActive !== undefined) {
    if (typeof isActive === "string") {
      isActiveBool = isActive.toLowerCase() === "true";
    } else if (typeof isActive === "boolean") {
      isActiveBool = isActive;
    } else {
      return apiResponse.validationError(
        res,
        "isActive must be a boolean or string 'true'/'false'"
      );
    }
  }

  try {
    const updates: Partial<{
      name: string;
      description?: string;
      address?: string;
      phoneNumber?: string;
      email?: string;
      imageUrl?: string;
      ownerId: string;
      isActive: boolean;
    }> = {};

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (address !== undefined) updates.address = address;
    if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber;
    if (email !== undefined) updates.email = email;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (ownerId !== undefined) updates.ownerId = ownerId;
    if (isActiveBool !== undefined) updates.isActive = isActiveBool;

    const updatedRestaurant = await restaurantModel.updateRestaurantInFranchise(
      franchiseId,
      id,
      updates
    );
    if (!updatedRestaurant) {
      return apiResponse.notFound(res, "Restaurant not found");
    }

    return apiResponse.success(
      res,
      updatedRestaurant,
      "Restaurant updated successfully"
    );
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return apiResponse.internalError(res, "Failed to update restaurant");
  }
};

// Delete restaurant - DELETE method
export const deleteRestaurant = async (req: Request, res: Response) => {
  const { franchiseId, id } = req.params;

  if (!id) {
    return apiResponse.validationError(res, "Restaurant ID is required");
  }

  try {
    const deleted = await restaurantModel.deleteRestaurantFromFranchise(
      franchiseId,
      id
    );
    if (!deleted) {
      return apiResponse.notFound(res, "Restaurant not found");
    }

    return apiResponse.success(res, null, "Restaurant deleted successfully");
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return apiResponse.internalError(res, "Failed to delete restaurant");
  }
};

// Toggle restaurant active status - PATCH method
export const toggleRestaurantActiveStatus = async (
  req: Request,
  res: Response
) => {
  const { franchiseId, id } = req.params;

  if (!id) {
    return apiResponse.validationError(res, "Restaurant ID is required");
  }

  try {
    const updatedRestaurant =
      await restaurantModel.toggleRestaurantActiveStatusInFranchise(
        franchiseId,
        id
      );
    if (!updatedRestaurant) {
      return apiResponse.notFound(res, "Restaurant not found");
    }

    return apiResponse.success(
      res,
      updatedRestaurant,
      "Restaurant active status toggled successfully"
    );
  } catch (error) {
    console.error("Error toggling restaurant active status:", error);
    return apiResponse.internalError(
      res,
      "Failed to toggle restaurant active status"
    );
  }
};

// Get restaurants count by owner - GET method
export const getRestaurantsCountByOwner = async (
  req: Request,
  res: Response
) => {
  const { franchiseId, ownerId } = req.params;

  if (!ownerId) {
    return apiResponse.validationError(res, "Owner ID is required");
  }

  try {
    const count = await restaurantModel.getRestaurantsCountInFranchise(
      franchiseId
    );
    return apiResponse.success(
      res,
      { count },
      "Restaurants count retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting restaurants count by owner:", error);
    return apiResponse.internalError(res, "Failed to get restaurants count");
  }
};

// Get active restaurants count by owner - GET method
export const getActiveRestaurantsCountByOwner = async (
  req: Request,
  res: Response
) => {
  const { franchiseId, ownerId } = req.params;

  if (!ownerId) {
    return apiResponse.validationError(res, "Owner ID is required");
  }

  try {
    const count = await restaurantModel.getActiveRestaurantsCountInFranchise(
      franchiseId
    );
    return apiResponse.success(
      res,
      { count },
      "Active restaurants count retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting active restaurants count by owner:", error);
    return apiResponse.internalError(
      res,
      "Failed to get active restaurants count"
    );
  }
};
