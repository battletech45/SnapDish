import { LocalExtra } from "../type/restaurantType";
import admin, { firestore } from "../service/firebaseService";

// Create a local extra in a restaurant
export const createLocalExtraInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  localExtra: Omit<LocalExtra, 'id' | 'createdAt'>
): Promise<LocalExtra> => {
  try {
    const now = new Date();
    const localExtraData = {
      ...localExtra,
      createdAt: admin.firestore.Timestamp.fromDate(now),
    };

    const docRef = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localExtras')
      .add(localExtraData);

    return localExtraData as unknown as LocalExtra;
  } catch (error) {
    console.error("Error creating local extra in restaurant:", error);
    throw error;
  }
};

// Find local extra by ID in restaurant
export const findLocalExtraByIdInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  localExtraId: string
): Promise<LocalExtra | null> => {
  try {
    const doc = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localExtras')
      .doc(localExtraId)
      .get();

    if (!doc.exists) return null;

    const data = doc.data();
    return data as unknown as LocalExtra;
  } catch (error) {
    console.error("Error finding local extra by ID in restaurant:", error);
    return null;
  }
};

// Find all local extras in a restaurant
export const findLocalExtrasInRestaurant = async (
  franchiseId: string,
  restaurantId: string
): Promise<LocalExtra[]> => {
  try {
    const snapshot = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localExtras')
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as LocalExtra[];
  } catch (error) {
    console.error("Error finding local extras in restaurant:", error);
    return [];
  }
};

// Find active local extras in a restaurant
export const findActiveLocalExtrasInRestaurant = async (
  franchiseId: string,
  restaurantId: string
): Promise<LocalExtra[]> => {
  try {
    const snapshot = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localExtras')
      .where('isActive', '==', true)
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as LocalExtra[];
  } catch (error) {
    console.error("Error finding active local extras in restaurant:", error);
    return [];
  }
};

// Update local extra in restaurant
export const updateLocalExtraInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  localExtraId: string,
  updates: Partial<LocalExtra>
): Promise<LocalExtra | null> => {
  try {
    await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localExtras')
      .doc(localExtraId)
      .update(updates);

    return findLocalExtraByIdInRestaurant(franchiseId, restaurantId, localExtraId);
  } catch (error) {
    console.error("Error updating local extra in restaurant:", error);
    return null;
  }
};

// Delete local extra from restaurant
export const deleteLocalExtraFromRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  localExtraId: string
): Promise<boolean> => {
  try {
    await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('localExtras')
      .doc(localExtraId)
      .delete();
    return true;
  } catch (error) {
    console.error("Error deleting local extra from restaurant:", error);
    return false;
  }
};
