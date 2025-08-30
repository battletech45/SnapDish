import { Request, Response } from "express";
import { Combo } from "../type/comboType";
import * as comboModel from "../model/comboModel";
import { apiResponse } from "../util/apiResponse";

// Get combo by ID - GET method, use req.params for ID
export const getComboById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return apiResponse.validationError(res, "Combo ID is required");
  }

  try {
    const combo = await comboModel.findComboById(id);
    if (!combo) {
      return apiResponse.notFound(res, "Combo not found");
    }

    return apiResponse.success(res, combo, "Combo retrieved successfully");
  } catch (error) {
    console.error("Error getting combo by ID:", error);
    return apiResponse.internalError(res, "Failed to get combo");
  }
};

// Get combos by restaurant ID - GET method, use req.params for restaurantId
export const getCombosByRestaurantId = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  if (!restaurantId) {
    return apiResponse.validationError(res, "Restaurant ID is required");
  }

  try {
    const combos = await comboModel.findCombosByRestaurantId(restaurantId);
    return apiResponse.success(res, combos, "Combos retrieved successfully");
  } catch (error) {
    console.error("Error getting combos by restaurant ID:", error);
    return apiResponse.internalError(res, "Failed to get combos");
  }
};

// Get active combos by restaurant ID - GET method, use req.params for restaurantId
export const getActiveCombosByRestaurantId = async (
  req: Request,
  res: Response
) => {
  const { restaurantId } = req.params;

  if (!restaurantId) {
    return apiResponse.validationError(res, "Restaurant ID is required");
  }

  try {
    const combos = await comboModel.findActiveCombosByRestaurantId(
      restaurantId
    );
    return apiResponse.success(
      res,
      combos,
      "Active combos retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting active combos by restaurant ID:", error);
    return apiResponse.internalError(res, "Failed to get active combos");
  }
};

// Get all combos - GET method
export const getAllCombos = async (req: Request, res: Response) => {
  try {
    const combos = await comboModel.getAllCombos();
    return apiResponse.success(
      res,
      combos,
      "All combos retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting all combos:", error);
    return apiResponse.internalError(res, "Failed to get combos");
  }
};

// Create a combo - POST method, use req.body for data
export const createCombo = async (req: Request, res: Response) => {
  const {
    name,
    description,
    restaurantId,
    imageUrl,
    isActive,
    isCustomizable,
    productIds,
    discountPercentage,
  } = req.body;

  // Validation
  if (!name || !restaurantId) {
    return apiResponse.validationError(
      res,
      "Name and restaurant ID are required"
    );
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

  // Convert isCustomizable to boolean
  let isCustomizableBool: boolean = false; // Default value
  if (isCustomizable !== undefined) {
    if (typeof isCustomizable === "string") {
      isCustomizableBool = isCustomizable.toLowerCase() === "true";
    } else if (typeof isCustomizable === "boolean") {
      isCustomizableBool = isCustomizable;
    } else {
      return apiResponse.validationError(
        res,
        "isCustomizable must be a boolean or string 'true'/'false'"
      );
    }
  }

  // Validate productIds is an array
  let validatedProductIds: string[] = [];
  if (productIds !== undefined) {
    if (Array.isArray(productIds)) {
      // If it's already an array, filter for strings
      validatedProductIds = productIds.filter((id) => typeof id === "string");
    } else if (typeof productIds === "string") {
      // Try to parse as JSON first (for JSON strings in form-data)
      try {
        const parsed = JSON.parse(productIds);
        if (Array.isArray(parsed)) {
          validatedProductIds = parsed.filter((id) => typeof id === "string");
        } else {
          return apiResponse.validationError(
            res,
            "productIds JSON string must contain an array"
          );
        }
      } catch (jsonError) {
        // If JSON parsing fails, try comma-separated string
        if (productIds.includes(",")) {
          validatedProductIds = productIds
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id.length > 0);
        } else if (productIds.trim() !== "") {
          // Single item
          validatedProductIds = [productIds.trim()];
        }
      }
    } else {
      return apiResponse.validationError(
        res,
        "productIds must be an array of strings, a JSON string, or a comma-separated string"
      );
    }
  }

  // Validate discount percentage
  let validatedDiscountPercentage: number | undefined = undefined;
  if (discountPercentage !== undefined) {
    const discount = parseFloat(discountPercentage);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      return apiResponse.validationError(
        res,
        "discountPercentage must be a number between 0 and 100"
      );
    }
    validatedDiscountPercentage = discount;
  }

  try {
    const comboData: Combo = {
      id: "",
      name,
      description,
      basePrice: 0,
      imageUrl,
      isActive: isActiveBool,
      productIds: validatedProductIds,
      discountPercentage: validatedDiscountPercentage || 0,
      validUntil: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newCombo = await comboModel.createCombo(comboData);
    return apiResponse.created(res, newCombo, "Combo created successfully");
  } catch (error) {
    console.error("Error creating combo:", error);
    return apiResponse.internalError(res, "Failed to create combo");
  }
};

// Update a combo - PUT method, use req.params for ID, req.body for data
export const updateCombo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    description,
    imageUrl,
    isActive,
    isCustomizable,
    productIds,
    discountPercentage,
  } = req.body;

  if (!id) {
    return apiResponse.validationError(res, "Combo ID is required");
  }

  // Validation
  if (name !== undefined && typeof name !== "string") {
    return apiResponse.validationError(res, "Name must be a string");
  }

  if (description !== undefined && typeof description !== "string") {
    return apiResponse.validationError(res, "Description must be a string");
  }

  if (imageUrl !== undefined && typeof imageUrl !== "string") {
    return apiResponse.validationError(res, "Image URL must be a string");
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

  // Convert isCustomizable to boolean
  let isCustomizableBool: boolean | undefined = undefined;
  if (isCustomizable !== undefined) {
    if (typeof isCustomizable === "string") {
      isCustomizableBool = isCustomizable.toLowerCase() === "true";
    } else if (typeof isCustomizable === "boolean") {
      isCustomizableBool = isCustomizable;
    } else {
      return apiResponse.validationError(
        res,
        "isCustomizable must be a boolean or string 'true'/'false'"
      );
    }
  }

  // Validate productIds is an array
  let validatedProductIds: string[] | undefined = undefined;
  if (productIds !== undefined) {
    if (Array.isArray(productIds)) {
      // If it's already an array, filter for strings
      validatedProductIds = productIds.filter((id) => typeof id === "string");
    } else if (typeof productIds === "string") {
      // Try to parse as JSON first (for JSON strings in form-data)
      try {
        const parsed = JSON.parse(productIds);
        if (Array.isArray(parsed)) {
          validatedProductIds = parsed.filter((id) => typeof id === "string");
        } else {
          return apiResponse.validationError(
            res,
            "productIds JSON string must contain an array"
          );
        }
      } catch (jsonError) {
        // If JSON parsing fails, try comma-separated string
        if (productIds.includes(",")) {
          validatedProductIds = productIds
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id.length > 0);
        } else if (productIds.trim() !== "") {
          // Single item
          validatedProductIds = [productIds.trim()];
        }
      }
    } else {
      return apiResponse.validationError(
        res,
        "productIds must be an array of strings, a JSON string, or a comma-separated string"
      );
    }
  }

  // Validate discount percentage
  let validatedDiscountPercentage: number | undefined = undefined;
  if (discountPercentage !== undefined) {
    const discount = parseFloat(discountPercentage);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      return apiResponse.validationError(
        res,
        "discountPercentage must be a number between 0 and 100"
      );
    }
    validatedDiscountPercentage = discount;
  }

  try {
    const updates: Partial<Combo> = {};

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (isActiveBool !== undefined) updates.isActive = isActiveBool;
    if (validatedProductIds !== undefined)
      updates.productIds = validatedProductIds;
    if (validatedDiscountPercentage !== undefined)
      updates.discountPercentage = validatedDiscountPercentage;

    const updatedCombo = await comboModel.updateCombo(id, updates);
    if (!updatedCombo) {
      return apiResponse.notFound(res, "Combo not found");
    }

    return apiResponse.success(res, updatedCombo, "Combo updated successfully");
  } catch (error) {
    console.error("Error updating combo:", error);
    return apiResponse.internalError(res, "Failed to update combo");
  }
};

// Delete a combo - DELETE method, use req.params for ID
export const deleteCombo = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return apiResponse.validationError(res, "Combo ID is required");
  }

  try {
    const deleted = await comboModel.deleteCombo(id);
    if (!deleted) {
      return apiResponse.notFound(res, "Combo not found");
    }

    return apiResponse.success(res, null, "Combo deleted successfully");
  } catch (error) {
    console.error("Error deleting combo:", error);
    return apiResponse.internalError(res, "Failed to delete combo");
  }
};

// Toggle combo active status - PATCH method, use req.params for ID
export const toggleComboActiveStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return apiResponse.validationError(res, "Combo ID is required");
  }

  try {
    const combo = await comboModel.findComboById(id);
    if (!combo) {
      return apiResponse.notFound(res, "Combo not found");
    }

    const updatedCombo = await comboModel.updateCombo(id, {
      isActive: !combo.isActive,
    });

    return apiResponse.success(
      res,
      updatedCombo,
      "Combo active status toggled successfully"
    );
  } catch (error) {
    console.error("Error toggling combo active status:", error);
    return apiResponse.internalError(
      res,
      "Failed to toggle combo active status"
    );
  }
};

// Add item to combo - POST method, use req.params for comboId, req.body for itemId
export const addItemToCombo = async (req: Request, res: Response) => {
  const { comboId } = req.params;
  const { itemId } = req.body;

  if (!comboId || !itemId) {
    return apiResponse.validationError(
      res,
      "Combo ID and Item ID are required"
    );
  }

  try {
    const updatedCombo = await comboModel.addItemToCombo(comboId, itemId);
    if (!updatedCombo) {
      return apiResponse.notFound(res, "Combo not found");
    }

    return apiResponse.success(
      res,
      updatedCombo,
      "Item added to combo successfully"
    );
  } catch (error) {
    console.error("Error adding item to combo:", error);
    return apiResponse.internalError(res, "Failed to add item to combo");
  }
};

// Remove item from combo - DELETE method, use req.params for comboId and itemId
export const removeItemFromCombo = async (req: Request, res: Response) => {
  const { comboId, itemId } = req.params;

  if (!comboId || !itemId) {
    return apiResponse.validationError(
      res,
      "Combo ID and Item ID are required"
    );
  }

  try {
    const updatedCombo = await comboModel.removeItemFromCombo(comboId, itemId);
    if (!updatedCombo) {
      return apiResponse.notFound(res, "Combo not found");
    }

    return apiResponse.success(
      res,
      updatedCombo,
      "Item removed from combo successfully"
    );
  } catch (error) {
    console.error("Error removing item from combo:", error);
    return apiResponse.internalError(res, "Failed to remove item from combo");
  }
};
