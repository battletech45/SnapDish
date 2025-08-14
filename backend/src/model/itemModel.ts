import { Item } from "../type/itemType";
import admin from "../service/firebaseService";

const db = admin.firestore();
const itemsCollection = db.collection("items");

export const findItemById = async (id: string): Promise<Item | null> => {
  try {
    const doc = await itemsCollection.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt?.toDate() || new Date(),
      updatedAt: data?.updatedAt?.toDate() || new Date(),
    } as Item;
  } catch (error) {
    console.error("Error finding item by ID:", error);
    return null;
  }
};

// Remove menuId-based queries since items are now embedded in menus
export const findItemsByCategory = async (
  category: string
): Promise<Item[]> => {
  try {
    const snapshot = await itemsCollection
      .where("category", "==", category)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Item[];
  } catch (error) {
    console.error("Error finding items by category:", error);
    return [];
  }
};

export const createItem = async (
  item: Omit<Item, "id" | "createdAt" | "updatedAt">
): Promise<Item> => {
  try {
    const now = new Date();
    const itemData = {
      ...item,
      createdAt: admin.firestore.Timestamp.fromDate(now),
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    const docRef = await itemsCollection.add(itemData);
    return {
      id: docRef.id,
      ...item,
      createdAt: now,
      updatedAt: now,
    };
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

export const updateItem = async (
  id: string,
  updates: Partial<Omit<Item, "id" | "createdAt" | "updatedAt">>
): Promise<Item | null> => {
  try {
    const updateData = {
      ...updates,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    await itemsCollection.doc(id).update(updateData);
    return findItemById(id);
  } catch (error) {
    console.error("Error updating item:", error);
    return null;
  }
};

export const deleteItem = async (id: string): Promise<boolean> => {
  try {
    await itemsCollection.doc(id).delete();
    return true;
  } catch (error) {
    console.error("Error deleting item:", error);
    return false;
  }
};

export const getAllItems = async (): Promise<Item[]> => {
  try {
    const snapshot = await itemsCollection.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Item[];
  } catch (error) {
    console.error("Error getting all items:", error);
    return [];
  }
};

export const findItemsByRestaurantId = async (
  restaurantId: string
): Promise<Item[]> => {
  try {
    const snapshot = await itemsCollection
      .where("restaurantId", "==", restaurantId)
      .where("isAvailable", "==", true)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Item[];
  } catch (error) {
    console.error("Error finding items by restaurant ID:", error);
    return [];
  }
};

export const findItemsByIds = async (itemIds: string[]): Promise<Item[]> => {
  try {
    if (itemIds.length === 0) return [];

    const items: Item[] = [];

    // Firestore has a limit of 10 items per 'in' query, so we need to batch
    const batchSize = 10;
    for (let i = 0; i < itemIds.length; i += batchSize) {
      const batch = itemIds.slice(i, i + batchSize);
      const snapshot = await itemsCollection
        .where(admin.firestore.FieldPath.documentId(), "in", batch)
        .get();

      const batchItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data()?.createdAt?.toDate() || new Date(),
        updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
      })) as Item[];

      items.push(...batchItems);
    }

    return items;
  } catch (error) {
    console.error("Error finding items by IDs:", error);
    return [];
  }
};
