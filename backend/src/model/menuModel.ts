import { Menu } from "../type/menuType";
import admin from "../service/firebaseService";

const db = admin.firestore();
const menusCollection = db.collection("menus");

export const findMenuById = async (id: string): Promise<Menu | null> => {
  try {
    const doc = await menusCollection.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt?.toDate() || new Date(),
      updatedAt: data?.updatedAt?.toDate() || new Date(),
    } as Menu;
  } catch (error) {
    console.error("Error finding menu by ID:", error);
    return null;
  }
};

export const findMenusByRestaurantId = async (
  restaurantId: string
): Promise<Menu[]> => {
  try {
    const snapshot = await menusCollection
      .where("restaurantId", "==", restaurantId)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Menu[];
  } catch (error) {
    console.error("Error finding menus by restaurant ID:", error);
    return [];
  }
};

export const findActiveMenusByRestaurantId = async (
  restaurantId: string
): Promise<Menu[]> => {
  try {
    const snapshot = await menusCollection
      .where("restaurantId", "==", restaurantId)
      .where("isActive", "==", true)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Menu[];
  } catch (error) {
    console.error("Error finding active menus by restaurant ID:", error);
    return [];
  }
};

export const createMenu = async (
  menu: Omit<Menu, "id" | "createdAt" | "updatedAt">
): Promise<Menu> => {
  try {
    const now = new Date();
    const menuData = {
      ...menu,
      createdAt: admin.firestore.Timestamp.fromDate(now),
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    const docRef = await menusCollection.add(menuData);
    return {
      id: docRef.id,
      ...menu,
      createdAt: now,
      updatedAt: now,
    };
  } catch (error) {
    console.error("Error creating menu:", error);
    throw error;
  }
};

export const updateMenu = async (
  id: string,
  updates: Partial<Omit<Menu, "id" | "createdAt" | "updatedAt">>
): Promise<Menu | null> => {
  try {
    const updateData = {
      ...updates,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    await menusCollection.doc(id).update(updateData);
    return findMenuById(id);
  } catch (error) {
    console.error("Error updating menu:", error);
    return null;
  }
};

export const deleteMenu = async (id: string): Promise<boolean> => {
  try {
    await menusCollection.doc(id).delete();
    return true;
  } catch (error) {
    console.error("Error deleting menu:", error);
    return false;
  }
};

export const getAllMenus = async (): Promise<Menu[]> => {
  try {
    const snapshot = await menusCollection.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Menu[];
  } catch (error) {
    console.error("Error getting all menus:", error);
    return [];
  }
};

// New function to add item ID to menu
export const addItemToMenu = async (
  menuId: string,
  itemId: string
): Promise<Menu | null> => {
  try {
    const menu = await findMenuById(menuId);
    if (!menu) return null;

    const now = new Date();
    const updatedProductIds = [...menu.productIds, itemId];

    const updateData = {
      productIds: updatedProductIds,
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    await menusCollection.doc(menuId).update(updateData);
    return findMenuById(menuId);
  } catch (error) {
    console.error("Error adding item to menu:", error);
    return null;
  }
};

// New function to remove item ID from menu
export const removeItemFromMenu = async (
  menuId: string,
  itemId: string
): Promise<Menu | null> => {
  try {
    const menu = await findMenuById(menuId);
    if (!menu) return null;

    const updatedProductIds = menu.productIds.filter((id) => id !== itemId);

    const updateData = {
      productIds: updatedProductIds,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    await menusCollection.doc(menuId).update(updateData);
    return findMenuById(menuId);
  } catch (error) {
    console.error("Error removing item from menu:", error);
    return null;
  }
};
