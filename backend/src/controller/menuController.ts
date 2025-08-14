import { Request, Response } from "express";
import { Menu } from "../type/menuType";
import * as menuModel from "../model/menuModel";
import { apiResponse } from "../util/apiResponse";

// Get menu by ID - GET method, use req.params for ID
export const getMenuById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return apiResponse.validationError(res, "Menu ID is required");
  }

  try {
    const menu = await menuModel.findMenuById(id);
    if (!menu) {
      return apiResponse.notFound(res, "Menu not found");
    }

    return apiResponse.success(res, menu, "Menu retrieved successfully");
  } catch (error) {
    console.error("Error getting menu by ID:", error);
    return apiResponse.internalError(res, "Failed to get menu");
  }
};

// Get menus by restaurant ID - GET method, use req.params for restaurantId
export const getMenusByRestaurantId = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  if (!restaurantId) {
    return apiResponse.validationError(res, "Restaurant ID is required");
  }

  try {
    const menus = await menuModel.findMenusByRestaurantId(restaurantId);
    return apiResponse.success(res, menus, "Menus retrieved successfully");
  } catch (error) {
    console.error("Error getting menus by restaurant ID:", error);
    return apiResponse.internalError(res, "Failed to get menus");
  }
};

// Get active menus by restaurant ID - GET method, use req.params for restaurantId
export const getActiveMenusByRestaurantId = async (
  req: Request,
  res: Response
) => {
  const { restaurantId } = req.params;

  if (!restaurantId) {
    return apiResponse.validationError(res, "Restaurant ID is required");
  }

  try {
    const menus = await menuModel.findActiveMenusByRestaurantId(restaurantId);
    return apiResponse.success(
      res,
      menus,
      "Active menus retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting active menus by restaurant ID:", error);
    return apiResponse.internalError(res, "Failed to get active menus");
  }
};

// Get all menus - GET method
export const getAllMenus = async (req: Request, res: Response) => {
  try {
    const menus = await menuModel.getAllMenus();
    return apiResponse.success(res, menus, "All menus retrieved successfully");
  } catch (error) {
    console.error("Error getting all menus:", error);
    return apiResponse.internalError(res, "Failed to get menus");
  }
};

// Create a menu - POST method, use req.body for data
export const createMenu = async (req: Request, res: Response) => {
  const {
    name,
    description,
    restaurantId,
    imageUrl,
    isActive,
    isCustomizable,
    productIds,
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
          validatedProductIds = productIds.split(",").map(id => id.trim()).filter(id => id.length > 0);
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

  try {
    const menuData: Omit<Menu, "id" | "createdAt" | "updatedAt"> = {
      name,
      description,
      restaurantId,
      imageUrl,
      isActive: isActiveBool,
      isCustomizable: isCustomizableBool,
      productIds: validatedProductIds,
    };

    const newMenu = await menuModel.createMenu(menuData);
    return apiResponse.created(res, newMenu, "Menu created successfully");
  } catch (error) {
    console.error("Error creating menu:", error);
    return apiResponse.internalError(res, "Failed to create menu");
  }
};

// Update a menu - PUT method, use req.params for ID, req.body for data
export const updateMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, imageUrl, isActive, isCustomizable, productIds } =
    req.body;

  if (!id) {
    return apiResponse.validationError(res, "Menu ID is required");
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
          validatedProductIds = productIds.split(",").map(id => id.trim()).filter(id => id.length > 0);
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

  try {
    const updates: Partial<Omit<Menu, "id" | "createdAt" | "updatedAt">> = {};

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (isActiveBool !== undefined) updates.isActive = isActiveBool;
    if (isCustomizableBool !== undefined)
      updates.isCustomizable = isCustomizableBool;
    if (validatedProductIds !== undefined)
      updates.productIds = validatedProductIds;

    const updatedMenu = await menuModel.updateMenu(id, updates);
    if (!updatedMenu) {
      return apiResponse.notFound(res, "Menu not found");
    }

    return apiResponse.success(res, updatedMenu, "Menu updated successfully");
  } catch (error) {
    console.error("Error updating menu:", error);
    return apiResponse.internalError(res, "Failed to update menu");
  }
};

// Delete a menu - DELETE method, use req.params for ID
export const deleteMenu = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return apiResponse.validationError(res, "Menu ID is required");
  }

  try {
    const deleted = await menuModel.deleteMenu(id);
    if (!deleted) {
      return apiResponse.notFound(res, "Menu not found");
    }

    return apiResponse.success(res, null, "Menu deleted successfully");
  } catch (error) {
    console.error("Error deleting menu:", error);
    return apiResponse.internalError(res, "Failed to delete menu");
  }
};

// Toggle menu active status - PATCH method, use req.params for ID
export const toggleMenuActiveStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return apiResponse.validationError(res, "Menu ID is required");
  }

  try {
    const menu = await menuModel.findMenuById(id);
    if (!menu) {
      return apiResponse.notFound(res, "Menu not found");
    }

    const updatedMenu = await menuModel.updateMenu(id, {
      isActive: !menu.isActive,
    });

    return apiResponse.success(
      res,
      updatedMenu,
      "Menu active status toggled successfully"
    );
  } catch (error) {
    console.error("Error toggling menu active status:", error);
    return apiResponse.internalError(
      res,
      "Failed to toggle menu active status"
    );
  }
};

// Add item to menu - POST method, use req.params for menuId, req.body for itemId
export const addItemToMenu = async (req: Request, res: Response) => {
  const { menuId } = req.params;
  const { itemId } = req.body;

  if (!menuId || !itemId) {
    return apiResponse.validationError(res, "Menu ID and Item ID are required");
  }

  try {
    const updatedMenu = await menuModel.addItemToMenu(menuId, itemId);
    if (!updatedMenu) {
      return apiResponse.notFound(res, "Menu not found");
    }

    return apiResponse.success(
      res,
      updatedMenu,
      "Item added to menu successfully"
    );
  } catch (error) {
    console.error("Error adding item to menu:", error);
    return apiResponse.internalError(res, "Failed to add item to menu");
  }
};

// Remove item from menu - DELETE method, use req.params for menuId and itemId
export const removeItemFromMenu = async (req: Request, res: Response) => {
  const { menuId, itemId } = req.params;

  if (!menuId || !itemId) {
    return apiResponse.validationError(res, "Menu ID and Item ID are required");
  }

  try {
    const updatedMenu = await menuModel.removeItemFromMenu(menuId, itemId);
    if (!updatedMenu) {
      return apiResponse.notFound(res, "Menu not found");
    }

    return apiResponse.success(
      res,
      updatedMenu,
      "Item removed from menu successfully"
    );
  } catch (error) {
    console.error("Error removing item from menu:", error);
    return apiResponse.internalError(res, "Failed to remove item from menu");
  }
};
