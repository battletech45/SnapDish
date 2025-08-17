import { Menu } from "../type/menuType";
import admin, { firestore } from "../service/firebaseService";

const menusCollection = firestore.collection("menus");

export const findMenuById = async (id: string): Promise<Menu | null> => {
  try {
    const doc = await menusCollection.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    return {
      ...data
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
      .orderBy("sortOrder", "asc")
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data()
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
      .orderBy("sortOrder", "asc")
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data()
    })) as Menu[];
  } catch (error) {
    console.error("Error finding active menus by restaurant ID:", error);
    return [];
  }
};

export const findMenusByCategory = async (
  restaurantId: string,
  category: string
): Promise<Menu[]> => {
  try {
    const snapshot = await menusCollection
      .where("restaurantId", "==", restaurantId)
      .where("category", "==", category)
      .where("isActive", "==", true)
      .orderBy("sortOrder", "asc")
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data()
    })) as Menu[];
  } catch (error) {
    console.error("Error finding menus by category:", error);
    return [];
  }
};

export const createMenu = async (
  menu: Menu
): Promise<Menu> => {
  try {
    const now = new Date();
    const menuData = {
      ...menu,
      createdAt: admin.firestore.Timestamp.fromDate(now),
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    const docRef = await menusCollection.add(menuData);
    return menu;
  } catch (error) {
    console.error("Error creating menu:", error);
    throw error;
  }
};

export const updateMenu = async (
  id: string,
  updates: Partial<Menu>
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
    const snapshot = await menusCollection.orderBy("sortOrder", "asc").get();

    return snapshot.docs.map((doc) => ({
      ...doc.data()
    })) as Menu[];
  } catch (error) {
    console.error("Error getting all menus:", error);
    return [];
  }
};

// Add item to menu
export const addItemToMenu = async (
  menuId: string,
  itemId: string
): Promise<Menu | null> => {
  try {
    const menu = await findMenuById(menuId);
    if (!menu) return null;

    const now = new Date();
    const updatedItems = [...menu.items, itemId];

    const updateData = {
      items: updatedItems,
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    await menusCollection.doc(menuId).update(updateData);
    return findMenuById(menuId);
  } catch (error) {
    console.error("Error adding item to menu:", error);
    return null;
  }
};

// Remove item from menu
export const removeItemFromMenu = async (
  menuId: string,
  itemId: string
): Promise<Menu | null> => {
  try {
    const menu = await findMenuById(menuId);
    if (!menu) return null;

    const updatedItems = menu.items.filter((item) => item.id !== itemId);

    const updateData = {
      items: updatedItems,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    await menusCollection.doc(menuId).update(updateData);
    return findMenuById(menuId);
  } catch (error) {
    console.error("Error removing item from menu:", error);
    return null;
  }
};

// Add combo to menu
export const addComboToMenu = async (
  menuId: string,
  comboId: string
): Promise<Menu | null> => {
  try {
    const menu = await findMenuById(menuId);
    if (!menu) return null;

    const now = new Date();
    const updatedCombos = [...menu.combos, comboId];

    const updateData = {
      combos: updatedCombos,
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    await menusCollection.doc(menuId).update(updateData);
    return findMenuById(menuId);
  } catch (error) {
    console.error("Error adding combo to menu:", error);
    return null;
  }
};

// Remove combo from menu
export const removeComboFromMenu = async (
  menuId: string,
  comboId: string
): Promise<Menu | null> => {
  try {
    const menu = await findMenuById(menuId);
    if (!menu) return null;

    const updatedCombos = menu.combos.filter((combo) => combo.id !== comboId);

    const updateData = {
      combos: updatedCombos,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    await menusCollection.doc(menuId).update(updateData);
    return findMenuById(menuId);
  } catch (error) {
    console.error("Error removing combo from menu:", error);
    return null;
  }
};
