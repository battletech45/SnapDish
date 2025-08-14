import { Request, Response } from "express";
import {
  createResource,
  findResourceById,
  findResourcesByRestaurantId,
  findResourcesByCategory,
  updateResource,
  deleteResource,
  updateResourceStock,
  getLowStockResources,
  getResourceStockHistory,
  bulkUpdateResourceStock,
  getResourcesWithStats,
} from "../model/resourceModel";
// import { isRestaurantOwner } from "../model/restaurantModel"; // Commented out for development
import { apiResponse } from "../util/apiResponse";

// Create a new resource
export const createResourceHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      description,
      unit,
      currentStock,
      minimumStock,
      costPerUnit,
      category,
      restaurantId,
      supplier,
    } = req.body;

    // Validate required fields
    if (!name || !unit || !restaurantId) {
      apiResponse.error(res, "Missing required fields", 400);
      return;
    }

    // DEVELOPMENT: Skip authentication checks
    // const userId = (req as any).user?.uid;
    // if (!userId) {
    //   apiResponse.error(res, "User not authenticated", 401);
    //   return;
    // }

    // const isOwner = await isRestaurantOwner(restaurantId, userId);
    // if (!isOwner) {
    //   apiResponse.error(
    //     res,
    //     "Unauthorized: You don't own this restaurant",
    //     403
    //   );
    //   return;
    // }

    const resource = await createResource({
      name,
      description,
      unit,
      currentStock: currentStock || 0,
      minimumStock: minimumStock || 0,
      costPerUnit: costPerUnit || 0,
      category: category || "ingredients",
      restaurantId,
      isActive: true,
      supplier,
    });

    apiResponse.success(res, resource, "Resource created successfully");
  } catch (error) {
    console.error("Error creating resource:", error);
    apiResponse.error(res, "Failed to create resource", 500);
  }
};

// Get all resources for a restaurant
export const getResourcesByRestaurantHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurantId } = req.params;
    const { category } = req.query;

    // DEVELOPMENT: Skip authentication checks
    // const userId = (req as any).user?.uid;
    // if (!userId) {
    //   apiResponse.error(res, "User not authenticated", 401);
    //   return;
    // }

    // const isOwner = await isRestaurantOwner(restaurantId, userId);
    // if (!isOwner) {
    //   apiResponse.error(
    //     res,
    //     "Unauthorized: You don't own this restaurant",
    //     403
    //   );
    //   return;
    // }

    let resources;
    if (category && typeof category === "string") {
      resources = await findResourcesByCategory(restaurantId, category);
    } else {
      resources = await findResourcesByRestaurantId(restaurantId);
    }

    apiResponse.success(res, resources, "Resources retrieved successfully");
  } catch (error) {
    console.error("Error getting resources:", error);
    apiResponse.error(res, "Failed to get resources", 500);
  }
};

// Get resource by ID
export const getResourceByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const resource = await findResourceById(id);
    if (!resource) {
      apiResponse.error(res, "Resource not found", 404);
      return;
    }

    // DEVELOPMENT: Skip authentication checks
    // const userId = (req as any).user?.uid;
    // if (!userId) {
    //   apiResponse.error(res, "User not authenticated", 401);
    //   return;
    // }

    // const isOwner = await isRestaurantOwner(resource.restaurantId, userId);
    // if (!isOwner) {
    //   apiResponse.error(
    //     res,
    //     "Unauthorized: You don't own this restaurant",
    //     403
    //   );
    //   return;
    // }

    apiResponse.success(res, resource, "Resource retrieved successfully");
  } catch (error) {
    console.error("Error getting resource:", error);
    apiResponse.error(res, "Failed to get resource", 500);
  }
};

// Update resource
export const updateResourceHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const resource = await findResourceById(id);
    if (!resource) {
      apiResponse.error(res, "Resource not found", 404);
      return;
    }

    // DEVELOPMENT: Skip authentication checks
    // const userId = (req as any).user?.uid;
    // if (!userId) {
    //   apiResponse.error(res, "User not authenticated", 401);
    //   return;
    // }

    // const isOwner = await isRestaurantOwner(resource.restaurantId, userId);
    // if (!isOwner) {
    //   apiResponse.error(
    //     res,
    //     "Unauthorized: You don't own this restaurant",
    //     403
    //   );
    //   return;
    // }

    const updatedResource = await updateResource(id, updates);
    if (!updatedResource) {
      apiResponse.error(res, "Failed to update resource", 500);
      return;
    }

    apiResponse.success(res, updatedResource, "Resource updated successfully");
  } catch (error) {
    console.error("Error updating resource:", error);
    apiResponse.error(res, "Failed to update resource", 500);
  }
};

// Delete resource
export const deleteResourceHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const resource = await findResourceById(id);
    if (!resource) {
      apiResponse.error(res, "Resource not found", 404);
      return;
    }

    // DEVELOPMENT: Skip authentication checks
    // const userId = (req as any).user?.uid;
    // if (!userId) {
    //   apiResponse.error(res, "User not authenticated", 401);
    //   return;
    // }

    // const isOwner = await isRestaurantOwner(resource.restaurantId, userId);
    // if (!isOwner) {
    //   apiResponse.error(
    //     res,
    //     "Unauthorized: You don't own this restaurant",
    //     403
    //   );
    //   return;
    // }

    const success = await deleteResource(id);
    if (!success) {
      apiResponse.error(res, "Failed to delete resource", 500);
      return;
    }

    apiResponse.success(res, "Resource deleted successfully");
  } catch (error) {
    console.error("Error deleting resource:", error);
    apiResponse.error(res, "Failed to delete resource", 500);
  }
};

// Update resource stock
export const updateResourceStockHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { quantity, operation, reason } = req.body;

    if (!quantity || !operation) {
      apiResponse.error(res, "Missing required fields", 400);
      return;
    }

    const resource = await findResourceById(id);
    if (!resource) {
      apiResponse.error(res, "Resource not found", 404);
      return;
    }

    // DEVELOPMENT: Skip authentication checks
    // const userId = (req as any).user?.uid;
    // if (!userId) {
    //   apiResponse.error(res, "User not authenticated", 401);
    //   return;
    // }

    // const isOwner = await isRestaurantOwner(resource.restaurantId, userId);
    // if (!isOwner) {
    //   apiResponse.error(
    //     res,
    //     "Unauthorized: You don't own this restaurant",
    //     403
    //   );
    //   return;
    // }

    const updatedResource = await updateResourceStock(
      id,
      quantity,
      operation,
      reason
    );
    if (!updatedResource) {
      apiResponse.error(res, "Failed to update resource stock", 500);
      return;
    }

    apiResponse.success(
      res,
      updatedResource,
      "Resource stock updated successfully"
    );
  } catch (error) {
    console.error("Error updating resource stock:", error);
    apiResponse.error(res, "Failed to update resource stock", 500);
  }
};

// Get low stock resources
export const getLowStockResourcesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurantId } = req.params;

    // DEVELOPMENT: Skip authentication checks
    // const userId = (req as any).user?.uid;
    // if (!userId) {
    //   apiResponse.error(res, "User not authenticated", 401);
    //   return;
    // }

    // const isOwner = await isRestaurantOwner(restaurantId, userId);
    // if (!isOwner) {
    //   apiResponse.error(
    //     res,
    //     "Unauthorized: You don't own this restaurant",
    //     403
    //   );
    //   return;
    // }

    const resources = await getLowStockResources(restaurantId);
    apiResponse.success(
      res,
      resources,
      "Low stock resources retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting low stock resources:", error);
    apiResponse.error(res, "Failed to get low stock resources", 500);
  }
};

// Get resource stock history
export const getResourceStockHistoryHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { limit } = req.query;

    const resource = await findResourceById(id);
    if (!resource) {
      apiResponse.error(res, "Resource not found", 404);
      return;
    }

    // DEVELOPMENT: Skip authentication checks
    // const userId = (req as any).user?.uid;
    // if (!userId) {
    //   apiResponse.error(res, "User not authenticated", 401);
    //   return;
    // }

    // const isOwner = await isRestaurantOwner(resource.restaurantId, userId);
    // if (!isOwner) {
    //   apiResponse.error(
    //     res,
    //     "Unauthorized: You don't own this restaurant",
    //     403
    //   );
    //   return;
    // }

    const history = await getResourceStockHistory(
      id,
      limit ? parseInt(limit as string) : 50
    );
    apiResponse.success(
      res,
      history,
      "Resource stock history retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting resource stock history:", error);
    apiResponse.error(res, "Failed to get resource stock history", 500);
  }
};

// Bulk update resource stock (for restocking)
export const bulkUpdateResourceStockHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { updates } = req.body;

    if (!updates || !Array.isArray(updates) || updates.length === 0) {
      apiResponse.error(res, "Invalid updates array", 400);
      return;
    }

    // Validate all resources belong to the same restaurant
    const resourceIds = updates.map((u: any) => u.resourceId);
    const resources = await Promise.all(
      resourceIds.map((id: string) => findResourceById(id))
    );

    const validResources = resources.filter((r) => r !== null);
    if (validResources.length === 0) {
      apiResponse.error(res, "No valid resources found", 404);
      return;
    }

    const restaurantId = validResources[0]?.restaurantId;
    const allSameRestaurant = validResources.every(
      (r) => r?.restaurantId === restaurantId
    );

    if (!allSameRestaurant) {
      apiResponse.error(
        res,
        "All resources must belong to the same restaurant",
        400
      );
      return;
    }

    // DEVELOPMENT: Skip authentication checks
    // const userId = (req as any).user?.uid;
    // if (!userId) {
    //   apiResponse.error(res, "User not authenticated", 401);
    //   return;
    // }

    // const isOwner = await isRestaurantOwner(restaurantId!, userId);
    // if (!isOwner) {
    //   apiResponse.error(
    //     res,
    //     "Unauthorized: You don't own this restaurant",
    //     403
    //   );
    //   return;
    // }

    const success = await bulkUpdateResourceStock(updates);
    if (!success) {
      apiResponse.error(res, "Failed to bulk update resource stock", 500);
      return;
    }

    apiResponse.success(res, "Resource stock bulk updated successfully");
  } catch (error) {
    console.error("Error bulk updating resource stock:", error);
    apiResponse.error(res, "Failed to bulk update resource stock", 500);
  }
};

// Get resources with statistics
export const getResourcesWithStatsHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { restaurantId } = req.params;

    // DEVELOPMENT: Skip authentication checks
    // const userId = (req as any).user?.uid;
    // if (!userId) {
    //   apiResponse.error(res, "User not authenticated", 401);
    //   return;
    // }

    // const isOwner = await isRestaurantOwner(restaurantId, userId);
    // if (!isOwner) {
    //   apiResponse.error(
    //     res,
    //     "Unauthorized: You don't own this restaurant",
    //     403
    //   );
    //   return;
    // }

    const stats = await getResourcesWithStats(restaurantId);
    apiResponse.success(
      res,
      stats,
      "Resources with stats retrieved successfully"
    );
  } catch (error) {
    console.error("Error getting resources with stats:", error);
    apiResponse.error(res, "Failed to get resources with stats", 500);
  }
};
