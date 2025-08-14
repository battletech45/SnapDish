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

// Get menus by category - GET method, use req.params for restaurantId and category
export const getMenusByCategory = async (req: Request, res: Response) => {
  const { restaurantId, category } = req.params;

  if (!restaurantId || !category) {
    return apiResponse.validationError(res, "Restaurant ID and category are required");
  }

  try {
    const menus = await menuModel.findMenusByCategory(restaurantId, category);
    return apiResponse.success(
      res,
      menus,
      "Menus by category retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting menus by category:", error);
    return apiResponse.internalError(res, "Failed to get menus by category");
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
    category,
    sortOrder,
    itemIds,
    comboIds,
  } = req.body;

  // Validation
  if (!name || !restaurantId || !category) {
    return apiResponse.validationError(
      res,
      "Name, restaurant ID, and category are required"
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

  // Validate sortOrder
  let validatedSortOrder: number = 0; // Default value
  if (sortOrder !== undefined) {
    const order = parseInt(sortOrder);
    if (isNaN(order) || order < 0) {
      return apiResponse.validationError(
        res,
        "sortOrder must be a non-negative number"
      );
    }
    validatedSortOrder = order;
  }

  // Validate itemIds is an array
  let validatedItemIds: string[] = [];
  if (itemIds !== undefined) {
    if (Array.isArray(itemIds)) {
      validatedItemIds = itemIds.filter((id) => typeof id === "string");
    } else if (typeof itemIds === "string") {
      try {
        const parsed = JSON.parse(itemIds);
        if (Array.isArray(parsed)) {
          validatedItemIds = parsed.filter((id) => typeof id === "string");
        } else {
          return apiResponse.validationError(
            res,
            "itemIds JSON string must contain an array"
          );
        }
      } catch (jsonError) {
        if (itemIds.includes(",")) {
          validatedItemIds = itemIds.split(",").map(id => id.trim()).filter(id => id.length > 0);
        } else if (itemIds.trim() !== "") {
          validatedItemIds = [itemIds.trim()];
        }
      }
    } else {
      return apiResponse.validationError(
        res,
        "itemIds must be an array of strings, a JSON string, or a comma-separated string"
      );
    }
  }

  // Validate comboIds is an array
  let validatedComboIds: string[] = [];
  if (comboIds !== undefined) {
    if (Array.isArray(comboIds)) {
      validatedComboIds = comboIds.filter((id) => typeof id === "string");
    } else if (typeof comboIds === "string") {
      try {
        const parsed = JSON.parse(comboIds);
        if (Array.isArray(parsed)) {
          validatedComboIds = parsed.filter((id) => typeof id === "string");
        } else {
          return apiResponse.validationError(
            res,
            "comboIds JSON string must contain an array"
          );
        }
      } catch (jsonError) {
        if (comboIds.includes(",")) {
          validatedComboIds = comboIds.split(",").map(id => id.trim()).filter(id => id.length > 0);
        } else if (comboIds.trim() !== "") {
          validatedComboIds = [comboIds.trim()];
        }
      }
    } else {
      return apiResponse.validationError(
        res,
        "comboIds must be an array of strings, a JSON string, or a comma-separated string"
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
      category,
      sortOrder: validatedSortOrder,
      itemIds: validatedItemIds,
      comboIds: validatedComboIds,
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
  const { name, description, imageUrl, isActive, category, sortOrder, itemIds, comboIds } =
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

  if (category !== undefined && typeof category !== "string") {
    return apiResponse.validationError(res, "Category must be a string");
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

  // Validate sortOrder
  let validatedSortOrder: number | undefined = undefined;
  if (sortOrder !== undefined) {
    const order = parseInt(sortOrder);
    if (isNaN(order) || order < 0) {
      return apiResponse.validationError(
        res,
        "sortOrder must be a non-negative number"
      );
    }
    validatedSortOrder = order;
  }

  // Validate itemIds is an array
  let validatedItemIds: string[] | undefined = undefined;
  if (itemIds !== undefined) {
    if (Array.isArray(itemIds)) {
      validatedItemIds = itemIds.filter((id) => typeof id === "string");
    } else if (typeof itemIds === "string") {
      try {
        const parsed = JSON.parse(itemIds);
        if (Array.isArray(parsed)) {
          validatedItemIds = parsed.filter((id) => typeof id === "string");
        } else {
          return apiResponse.validationError(
            res,
            "itemIds JSON string must contain an array"
          );
        }
      } catch (jsonError) {
        if (itemIds.includes(",")) {
          validatedItemIds = itemIds.split(",").map(id => id.trim()).filter(id => id.length > 0);
        } else if (itemIds.trim() !== "") {
          validatedItemIds = [itemIds.trim()];
        }
      }
    } else {
      return apiResponse.validationError(
        res,
        "itemIds must be an array of strings, a JSON string, or a comma-separated string"
      );
    }
  }

  // Validate comboIds is an array
  let validatedComboIds: string[] | undefined = undefined;
  if (comboIds !== undefined) {
    if (Array.isArray(comboIds)) {
      validatedComboIds = comboIds.filter((id) => typeof id === "string");
    } else if (typeof comboIds === "string") {
      try {
        const parsed = JSON.parse(comboIds);
        if (Array.isArray(parsed)) {
          validatedComboIds = parsed.filter((id) => typeof id === "string");
        } else {
          return apiResponse.validationError(
            res,
            "comboIds JSON string must contain an array"
          );
        }
      } catch (jsonError) {
        if (comboIds.includes(",")) {
          validatedComboIds = comboIds.split(",").map(id => id.trim()).filter(id => id.length > 0);
        } else if (comboIds.trim() !== "") {
          validatedComboIds = [comboIds.trim()];
        }
      }
    } else {
      return apiResponse.validationError(
        res,
        "comboIds must be an array of strings, a JSON string, or a comma-separated string"
      );
    }
  }

  try {
    const updates: Partial<Omit<Menu, "id" | "createdAt" | "updatedAt">> = {};

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (isActiveBool !== undefined) updates.isActive = isActiveBool;
    if (category !== undefined) updates.category = category;
    if (validatedSortOrder !== undefined) updates.sortOrder = validatedSortOrder;
    if (validatedItemIds !== undefined) updates.itemIds = validatedItemIds;
    if (validatedComboIds !== undefined) updates.comboIds = validatedComboIds;

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

// Add combo to menu - POST method, use req.params for menuId, req.body for comboId
export const addComboToMenu = async (req: Request, res: Response) => {
  const { menuId } = req.params;
  const { comboId } = req.body;

  if (!menuId || !comboId) {
    return apiResponse.validationError(res, "Menu ID and Combo ID are required");
  }

  try {
    const updatedMenu = await menuModel.addComboToMenu(menuId, comboId);
    if (!updatedMenu) {
      return apiResponse.notFound(res, "Menu not found");
    }

    return apiResponse.success(
      res,
      updatedMenu,
      "Combo added to menu successfully"
    );
  } catch (error) {
    console.error("Error adding combo to menu:", error);
    return apiResponse.internalError(res, "Failed to add combo to menu");
  }
};

// Remove combo from menu - DELETE method, use req.params for menuId and comboId
export const removeComboFromMenu = async (req: Request, res: Response) => {
  const { menuId, comboId } = req.params;

  if (!menuId || !comboId) {
    return apiResponse.validationError(res, "Menu ID and Combo ID are required");
  }

  try {
    const updatedMenu = await menuModel.removeComboFromMenu(menuId, comboId);
    if (!updatedMenu) {
      return apiResponse.notFound(res, "Menu not found");
    }

    return apiResponse.success(
      res,
      updatedMenu,
      "Combo removed from menu successfully"
    );
  } catch (error) {
    console.error("Error removing combo from menu:", error);
    return apiResponse.internalError(res, "Failed to remove combo from menu");
  }
};
