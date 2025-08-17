import { LocalItem } from "../type/restaurantType";
import admin, { firestore } from "../service/firebaseService";

// Create a local item in a restaurant
export const createLocalItemInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  localItem: LocalItem
): Promise<LocalItem> => {
  try {
    const now = new Date();
    const localItemData = {
      ...localItem,
      createdAt: admin.firestore.Timestamp.fromDate(now),
    };

    const docRef = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localItems')
      .add(localItemData);

    return localItemData as unknown as LocalItem;
  } catch (error) {
    console.error("Error creating local item in restaurant:", error);
    throw error;
  }
};

// Find local item by ID in restaurant
export const findLocalItemByIdInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  localItemId: string
): Promise<LocalItem | null> => {
  try {
    const doc = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localItems')
      .doc(localItemId)
      .get();

    if (!doc.exists) return null;

    const data = doc.data();
    return data as unknown as LocalItem;
  } catch (error) {
    console.error("Error finding local item by ID in restaurant:", error);
    return null;
  }
};

// Find all local items in a restaurant
export const findLocalItemsInRestaurant = async (
  franchiseId: string,
  restaurantId: string
): Promise<LocalItem[]> => {
  try {
    const snapshot = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localItems')
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as LocalItem[];
  } catch (error) {
    console.error("Error finding local items in restaurant:", error);
    return [];
  }
};

// Find active local items in a restaurant
export const findActiveLocalItemsInRestaurant = async (
  franchiseId: string,
  restaurantId: string
): Promise<LocalItem[]> => {
  try {
    const snapshot = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localItems')
      .where('isActive', '==', true)
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as LocalItem[];
  } catch (error) {
    console.error("Error finding active local items in restaurant:", error);
    return [];
  }
};

// Update local item in restaurant
export const updateLocalItemInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  localItemId: string,
  updates: Partial<LocalItem>
): Promise<LocalItem | null> => {
  try {
    await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localItems')
      .doc(localItemId)
      .update(updates);

    return findLocalItemByIdInRestaurant(franchiseId, restaurantId, localItemId);
  } catch (error) {
    console.error("Error updating local item in restaurant:", error);
    return null;
  }
};

// Delete local item from restaurant
export const deleteLocalItemFromRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  localItemId: string
): Promise<boolean> => {
  try {
    await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localItems')
      .doc(localItemId)
      .delete();
    return true;
  } catch (error) {
    console.error("Error deleting local item from restaurant:", error);
    return false;
  }
};
