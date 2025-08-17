import { Resource, ResourceStockUpdate } from "../type/resourceType";
import admin, { firestore } from "../service/firebaseService";

const resourcesCollection = firestore.collection("resources");
const stockHistoryCollection = firestore.collection("resource_stock_history");

// Create a new resource
export const createResource = async (
  resource: Resource
): Promise<Resource> => {
  try {
    const now = new Date();
    const resourceData = {
      ...resource,
      createdAt: admin.firestore.Timestamp.fromDate(now),
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    const docRef = await resourcesCollection.add(resourceData);
    return resource;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
};

// Find resource by ID
export const findResourceById = async (
  id: string
): Promise<Resource | null> => {
  try {
    const doc = await resourcesCollection.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    return {
      ...data
    } as Resource;
  } catch (error) {
    console.error("Error finding resource by ID:", error);
    return null;
  }
};

// Find resources by restaurant ID
export const findResourcesByRestaurantId = async (
  restaurantId: string
): Promise<Resource[]> => {
  try {
    const snapshot = await resourcesCollection
      .where("restaurantId", "==", restaurantId)
      .where("isActive", "==", true)
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data()
    })) as Resource[];
  } catch (error) {
    console.error("Error finding resources by restaurant ID:", error);
    return [];
  }
};

// Find resources by category
export const findResourcesByCategory = async (
  restaurantId: string,
  category: string
): Promise<Resource[]> => {
  try {
    const snapshot = await resourcesCollection
      .where("restaurantId", "==", restaurantId)
      .where("category", "==", category)
      .where("isActive", "==", true)
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data()
    })) as Resource[];
  } catch (error) {
    console.error("Error finding resources by category:", error);
    return [];
  }
};

// Update resource
export const updateResource = async (
  id: string,
  updates: Partial<Omit<Resource, "id" | "createdAt" | "updatedAt">>
): Promise<Resource | null> => {
  try {
    const updateData = {
      ...updates,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    await resourcesCollection.doc(id).update(updateData);
    return findResourceById(id);
  } catch (error) {
    console.error("Error updating resource:", error);
    return null;
  }
};

// Delete resource
export const deleteResource = async (id: string): Promise<boolean> => {
  try {
    await resourcesCollection.doc(id).delete();
    return true;
  } catch (error) {
    console.error("Error deleting resource:", error);
    return false;
  }
};

// Update resource stock
export const updateResourceStock = async (
  resourceId: string,
  quantity: number,
  operation: "add" | "subtract" | "set",
  reason?: string
): Promise<Resource | null> => {
  try {
    const resource = await findResourceById(resourceId);
    if (!resource) return null;

    let newStock: number;
    switch (operation) {
      case "add":
        newStock = resource.currentStock + quantity;
        break;
      case "subtract":
        newStock = Math.max(0, resource.currentStock - quantity);
        break;
      case "set":
        newStock = quantity;
        break;
      default:
        throw new Error("Invalid operation");
    }

    // Update resource stock
    const updateData = {
      currentStock: newStock,
      lastRestocked:
        operation === "add"
          ? admin.firestore.Timestamp.fromDate(new Date())
          : resource.lastRestocked,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    await resourcesCollection.doc(resourceId).update(updateData);

    // Record stock history
    const stockUpdate: Omit<ResourceStockUpdate, "date"> = {
      resourceId,
      quantity,
      operation,
      reason: reason || "manual_update",
    };

    await stockHistoryCollection.add({
      ...stockUpdate,
      date: admin.firestore.Timestamp.fromDate(new Date()),
    });

    return findResourceById(resourceId);
  } catch (error) {
    console.error("Error updating resource stock:", error);
    return null;
  }
};

// Get low stock resources (below minimum threshold)
export const getLowStockResources = async (
  restaurantId: string
): Promise<Resource[]> => {
  try {
    const resources = await findResourcesByRestaurantId(restaurantId);
    return resources.filter(
      (resource) => resource.currentStock <= resource.minimumStock
    );
  } catch (error) {
    console.error("Error getting low stock resources:", error);
    return [];
  }
};

// Get stock history for a resource
export const getResourceStockHistory = async (
  resourceId: string,
  limit: number = 50
): Promise<ResourceStockUpdate[]> => {
  try {
    const snapshot = await stockHistoryCollection
      .where("resourceId", "==", resourceId)
      .orderBy("date", "desc")
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data()
    })) as ResourceStockUpdate[];
  } catch (error) {
    console.error("Error getting resource stock history:", error);
    return [];
  }
};

// Bulk update resources (for restocking)
export const bulkUpdateResourceStock = async (
  updates: Array<{
    resourceId: string;
    quantity: number;
    operation: "add" | "subtract" | "set";
    reason?: string;
  }>
): Promise<boolean> => {
  try {
    const batch = firestore.batch();

    for (const update of updates) {
      const resource = await findResourceById(update.resourceId);
      if (!resource) continue;

      let newStock: number;
      switch (update.operation) {
        case "add":
          newStock = resource.currentStock + update.quantity;
          break;
        case "subtract":
          newStock = Math.max(0, resource.currentStock - update.quantity);
          break;
        case "set":
          newStock = update.quantity;
          break;
        default:
          continue;
      }

      // Update resource
      const resourceRef = resourcesCollection.doc(update.resourceId);
      batch.update(resourceRef, {
        currentStock: newStock,
        lastRestocked:
          update.operation === "add"
            ? admin.firestore.Timestamp.fromDate(new Date())
            : resource.lastRestocked,
        updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
      });

      // Add to stock history
      const historyRef = stockHistoryCollection.doc();
      batch.set(historyRef, {
        resourceId: update.resourceId,
        quantity: update.quantity,
        operation: update.operation,
        reason: update.reason || "bulk_update",
        date: admin.firestore.Timestamp.fromDate(new Date()),
      });
    }

    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error bulk updating resource stock:", error);
    return false;
  }
};

// Get resources with statistics
export const getResourcesWithStats = async (
  restaurantId: string
): Promise<{
  resources: Resource[];
  totalResources: number;
  lowStockCount: number;
  outOfStockCount: number;
  totalValue: number;
}> => {
  try {
    const resources = await findResourcesByRestaurantId(restaurantId);

    const totalResources = resources.length;
    const lowStockCount = resources.filter(
      (r) => r.currentStock <= r.minimumStock && r.currentStock > 0
    ).length;
    const outOfStockCount = resources.filter(
      (r) => r.currentStock === 0
    ).length;
    const totalValue = resources.reduce(
      (sum, r) => sum + r.currentStock * r.costPerUnit,
      0
    );

    return {
      resources,
      totalResources,
      lowStockCount,
      outOfStockCount,
      totalValue,
    };
  } catch (error) {
    console.error("Error getting resources with stats:", error);
    return {
      resources: [],
      totalResources: 0,
      lowStockCount: 0,
      outOfStockCount: 0,
      totalValue: 0,
    };
  }
};
