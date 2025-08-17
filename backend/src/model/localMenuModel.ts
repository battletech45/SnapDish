import { LocalMenu } from "../type/restaurantType";
import admin, { firestore } from "../service/firebaseService";

// Create a local menu in a restaurant
export const createLocalMenuInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  localMenu: LocalMenu
): Promise<LocalMenu> => {
  try {
    const now = new Date();
    const localMenuData = {
      ...localMenu,
      createdAt: admin.firestore.Timestamp.fromDate(now),
    };

    const docRef = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localMenus')
      .add(localMenuData);

    return localMenuData as unknown as LocalMenu;
  } catch (error) {
    console.error("Error creating local menu in restaurant:", error);
    throw error;
  }
};

// Find local menu by ID in restaurant
export const findLocalMenuByIdInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  localMenuId: string
): Promise<LocalMenu | null> => {
  try {
    const doc = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localMenus')
      .doc(localMenuId)
      .get();

    if (!doc.exists) return null;

    const data = doc.data();
    return data as unknown as LocalMenu;
  } catch (error) {
    console.error("Error finding local menu by ID in restaurant:", error);
    return null;
  }
};

// Find all local menus in a restaurant
export const findLocalMenusInRestaurant = async (
  franchiseId: string,
  restaurantId: string
): Promise<LocalMenu[]> => {
  try {
    const snapshot = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localMenus')
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as LocalMenu[];
  } catch (error) {
    console.error("Error finding local menus in restaurant:", error);
    return [];
  }
};

// Find active local menus in a restaurant
export const findActiveLocalMenusInRestaurant = async (
  franchiseId: string,
  restaurantId: string
): Promise<LocalMenu[]> => {
  try {
    const snapshot = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localMenus')
      .where('isActive', '==', true)
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as LocalMenu[];
  } catch (error) {
    console.error("Error finding active local menus in restaurant:", error);
    return [];
  }
};

// Update local menu in restaurant
export const updateLocalMenuInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  localMenuId: string,
  updates: Partial<LocalMenu>
): Promise<LocalMenu | null> => {
  try {
    await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localMenus')
      .doc(localMenuId)
      .update(updates);

    return findLocalMenuByIdInRestaurant(franchiseId, restaurantId, localMenuId);
  } catch (error) {
    console.error("Error updating local menu in restaurant:", error);
    return null;
  }
};

// Delete local menu from restaurant
export const deleteLocalMenuFromRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  localMenuId: string
): Promise<boolean> => {
  try {
    await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localMenus')
      .doc(localMenuId)
      .delete();
    return true;
  } catch (error) {
    console.error("Error deleting local menu from restaurant:", error);
    return false;
  }
};
