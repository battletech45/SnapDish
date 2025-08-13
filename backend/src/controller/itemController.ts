import { Request, Response } from "express";
import { Item } from "../type/itemType";
import * as itemModel from "../model/itemModel";
import * as menuModel from "../model/menuModel";
import { apiResponse } from "../util/apiResponse";

// Get item by ID - GET method, use req.params for ID
export const getItemById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return apiResponse.validationError(res, "Item ID is required");
  }

  try {
    const item = await itemModel.findItemById(id);
    if (!item) {
      return apiResponse.notFound(res, "Item not found");
    }

    return apiResponse.success(res, item, "Item retrieved successfully");
  } catch (error) {
    console.error("Error getting item by ID:", error);
    return apiResponse.internalError(res, "Failed to get item");
  }
};

// Get items by menu ID - GET method, use req.params for menuId
export const getItemsByMenuId = async (req: Request, res: Response) => {
  const { menuId } = req.params;

  if (!menuId) {
    return apiResponse.validationError(res, "Menu ID is required");
  }

  try {
    const menu = await menuModel.findMenuById(menuId);
    if (!menu) {
      return apiResponse.notFound(res, "Menu not found");
    }

    // Fetch all items by their IDs
    const items = await Promise.all(
      menu.productIds.map(async (itemId) => {
        return await itemModel.findItemById(itemId);
      })
    );

    // Filter out null values (items that don't exist)
    const validItems = items.filter((item) => item !== null);

    return apiResponse.success(res, validItems, "Items retrieved successfully");
  } catch (error) {
    console.error("Error getting items by menu ID:", error);
    return apiResponse.internalError(res, "Failed to get items");
  }
};

// Get available items by menu ID - GET method, use req.params for menuId
export const getAvailableItemsByMenuId = async (
  req: Request,
  res: Response
) => {
  const { menuId } = req.params;

  if (!menuId) {
    return apiResponse.validationError(res, "Menu ID is required");
  }

  try {
    const menu = await menuModel.findMenuById(menuId);
    if (!menu) {
      return apiResponse.notFound(res, "Menu not found");
    }

    // Fetch all items by their IDs
    const items = await Promise.all(
      menu.productIds.map(async (itemId) => {
        return await itemModel.findItemById(itemId);
      })
    );

    // Filter out null values and only return available items
    const availableItems = items.filter(
      (item) => item !== null && item.isAvailable
    );

    return apiResponse.success(
      res,
      availableItems,
      "Available items retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting available items by menu ID:", error);
    return apiResponse.internalError(res, "Failed to get available items");
  }
};

// Get items by category - GET method, use req.query for category
export const getItemsByCategory = async (req: Request, res: Response) => {
  const { category } = req.query;

  if (!category || typeof category !== "string") {
    return apiResponse.validationError(res, "Category is required");
  }

  try {
    const items = await itemModel.findItemsByCategory(category);
    return apiResponse.success(res, items, "Items retrieved successfully");
  } catch (error) {
    console.error("Error getting items by category:", error);
    return apiResponse.internalError(res, "Failed to get items");
  }
};

// Get items by restaurant ID - GET method, use req.params for restaurantId
export const getItemsByRestaurantId = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  if (!restaurantId) {
    return apiResponse.validationError(res, "Restaurant ID is required");
  }

  try {
    const menus = await menuModel.findMenusByRestaurantId(restaurantId);

    // Get all unique item IDs from all menus
    const allItemIds = [...new Set(menus.flatMap((menu) => menu.productIds))];

    // Fetch all items by their IDs
    const items = await Promise.all(
      allItemIds.map(async (itemId) => {
        return await itemModel.findItemById(itemId);
      })
    );

    // Filter out null values
    const validItems = items.filter((item) => item !== null);

    return apiResponse.success(res, validItems, "Items retrieved successfully");
  } catch (error) {
    console.error("Error getting items by restaurant ID:", error);
    return apiResponse.internalError(res, "Failed to get items");
  }
};

// Get all items - GET method
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await itemModel.getAllItems();
    return apiResponse.success(res, items, "All items retrieved successfully");
  } catch (error) {
    console.error("Error getting all items:", error);
    return apiResponse.internalError(res, "Failed to get items");
  }
};

// Create an item - POST method, use req.body for data
export const createItem = async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    category,
    imageUrl,
    isAvailable,
    isSingleSize,
    sizes,
    isCustomizable,
    customizations,
  } = req.body;

  // Validation
  if (!name || !price || !category) {
    return apiResponse.validationError(
      res,
      "Name, price, and category are required"
    );
  }

  // Validate price is a number
  const priceNum = parseFloat(price);
  if (isNaN(priceNum) || priceNum <= 0) {
    return apiResponse.validationError(res, "Price must be a positive number");
  }

  // Convert isAvailable to boolean if it's a string
  let isAvailableBool: boolean = true; // Default value
  if (isAvailable !== undefined) {
    if (typeof isAvailable === "string") {
      isAvailableBool = isAvailable.toLowerCase() === "true";
    } else if (typeof isAvailable === "boolean") {
      isAvailableBool = isAvailable;
    } else {
      return apiResponse.validationError(
        res,
        "isAvailable must be a boolean or string 'true'/'false'"
      );
    }
  }

  // Convert isSingleSize to boolean
  let isSingleSizeBool: boolean = true; // Default value
  if (isSingleSize !== undefined) {
    if (typeof isSingleSize === "string") {
      isSingleSizeBool = isSingleSize.toLowerCase() === "true";
    } else if (typeof isSingleSize === "boolean") {
      isSingleSizeBool = isSingleSize;
    } else {
      return apiResponse.validationError(
        res,
        "isSingleSize must be a boolean or string 'true'/'false'"
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

  // Parse sizes if it's a JSON string
  let parsedSizes: { size: string; price: number }[] | undefined = undefined;
  if (sizes !== undefined) {
    try {
      if (typeof sizes === "string") {
        parsedSizes = JSON.parse(sizes);
      } else if (Array.isArray(sizes)) {
        parsedSizes = sizes;
      }
    } catch (error) {
      return apiResponse.validationError(res, "Invalid sizes JSON format");
    }
  }

  // Parse customizations if it's a JSON string
  let parsedCustomizations: { name: string; price: number }[] | undefined =
    undefined;
  if (customizations !== undefined) {
    try {
      if (typeof customizations === "string") {
        parsedCustomizations = JSON.parse(customizations);
      } else if (Array.isArray(customizations)) {
        parsedCustomizations = customizations;
      }
    } catch (error) {
      return apiResponse.validationError(
        res,
        "Invalid customizations JSON format"
      );
    }
  }

  try {
    const itemData: Omit<Item, "id" | "createdAt" | "updatedAt"> = {
      name,
      description,
      price: priceNum,
      category,
      imageUrl,
      isAvailable: isAvailableBool,
      isSingleSize: isSingleSizeBool,
      isCustomizable: isCustomizableBool,
    };

    // Only add sizes if it's defined and NOT single size
    if (parsedSizes !== undefined && !isSingleSizeBool) {
      itemData.sizes = parsedSizes;
    }

    // Only add customizations if it's defined and is customizable
    if (parsedCustomizations !== undefined && isCustomizableBool) {
      itemData.customizations = parsedCustomizations;
    }

    const newItem = await itemModel.createItem(itemData);
    return apiResponse.created(res, newItem, "Item created successfully");
  } catch (error) {
    console.error("Error creating item:", error);
    return apiResponse.internalError(res, "Failed to create item");
  }
};

// Update an item - PUT method, use req.params for ID, req.body for data
export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    category,
    imageUrl,
    isAvailable,
    isSingleSize,
    sizes,
    isCustomizable,
    customizations,
  } = req.body;

  if (!id) {
    return apiResponse.validationError(res, "Item ID is required");
  }

  // Validation
  if (name !== undefined && typeof name !== "string") {
    return apiResponse.validationError(res, "Name must be a string");
  }

  if (description !== undefined && typeof description !== "string") {
    return apiResponse.validationError(res, "Description must be a string");
  }

  if (price !== undefined) {
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return apiResponse.validationError(
        res,
        "Price must be a positive number"
      );
    }
  }

  if (category !== undefined && typeof category !== "string") {
    return apiResponse.validationError(res, "Category must be a string");
  }

  if (imageUrl !== undefined && typeof imageUrl !== "string") {
    return apiResponse.validationError(res, "Image URL must be a string");
  }

  // Convert isAvailable to boolean if it's a string
  let isAvailableBool: boolean | undefined = undefined;
  if (isAvailable !== undefined) {
    if (typeof isAvailable === "string") {
      isAvailableBool = isAvailable.toLowerCase() === "true";
    } else if (typeof isAvailable === "boolean") {
      isAvailableBool = isAvailable;
    } else {
      return apiResponse.validationError(
        res,
        "isAvailable must be a boolean or string 'true'/'false'"
      );
    }
  }

  // Convert isSingleSize to boolean
  let isSingleSizeBool: boolean | undefined = undefined;
  if (isSingleSize !== undefined) {
    if (typeof isSingleSize === "string") {
      isSingleSizeBool = isSingleSize.toLowerCase() === "true";
    } else if (typeof isSingleSize === "boolean") {
      isSingleSizeBool = isSingleSize;
    } else {
      return apiResponse.validationError(
        res,
        "isSingleSize must be a boolean or string 'true'/'false'"
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

  try {
    const updates: Partial<Omit<Item, "id" | "createdAt" | "updatedAt">> = {};

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = parseFloat(price);
    if (category !== undefined) updates.category = category;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (isAvailableBool !== undefined) updates.isAvailable = isAvailableBool;
    if (isSingleSizeBool !== undefined) updates.isSingleSize = isSingleSizeBool;
    if (sizes !== undefined) updates.sizes = sizes;
    if (isCustomizableBool !== undefined)
      updates.isCustomizable = isCustomizableBool;
    if (customizations !== undefined) updates.customizations = customizations;

    const updatedItem = await itemModel.updateItem(id, updates);
    if (!updatedItem) {
      return apiResponse.notFound(res, "Item not found");
    }

    return apiResponse.success(res, updatedItem, "Item updated successfully");
  } catch (error) {
    console.error("Error updating item:", error);
    return apiResponse.internalError(res, "Failed to update item");
  }
};

// Delete an item - DELETE method, use req.params for ID
export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return apiResponse.validationError(res, "Item ID is required");
  }

  try {
    const deleted = await itemModel.deleteItem(id);
    if (!deleted) {
      return apiResponse.notFound(res, "Item not found");
    }

    return apiResponse.success(res, null, "Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
    return apiResponse.internalError(res, "Failed to delete item");
  }
};

// Toggle item availability - PATCH method, use req.params for ID
export const toggleItemAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return apiResponse.validationError(res, "Item ID is required");
  }

  try {
    const item = await itemModel.findItemById(id);
    if (!item) {
      return apiResponse.notFound(res, "Item not found");
    }

    const updatedItem = await itemModel.updateItem(id, {
      isAvailable: !item.isAvailable,
    });

    return apiResponse.success(
      res,
      updatedItem,
      "Item availability toggled successfully"
    );
  } catch (error) {
    console.error("Error toggling item availability:", error);
    return apiResponse.internalError(res, "Failed to toggle item availability");
  }
};
