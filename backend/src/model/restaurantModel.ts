import { Restaurant, LocalItem, LocalMenu, LocalExtra, ItemPricing, ExtraPricing } from "../type/restaurantType";
import admin, { firestore } from "../service/firebaseService";

// Create a new restaurant under a franchise
export const createRestaurantUnderFranchise = async (
  franchiseId: string,
  restaurant: Restaurant
): Promise<Restaurant> => {
  try {
    const now = new Date();
    const restaurantData = {
      ...restaurant,
      createdAt: admin.firestore.Timestamp.fromDate(now),
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    // Create as subcollection under franchise
    const docRef = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .add(restaurantData);

    return restaurantData as unknown as Restaurant;
  } catch (error) {
    console.error("Error creating restaurant under franchise:", error);
    throw error;
  }
};

// Find restaurant by ID within a franchise
export const findRestaurantByIdInFranchise = async (
  franchiseId: string,
  restaurantId: string
): Promise<Restaurant | null> => {
  try {
    const doc = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .get();

    if (!doc.exists) return null;

    const data = doc.data();
    return data as unknown as Restaurant;
  } catch (error) {
    console.error("Error finding restaurant by ID in franchise:", error);
    return null;
  }
};

// Find all restaurants in a franchise
export const findRestaurantsInFranchise = async (
  franchiseId: string
): Promise<Restaurant[]> => {
  try {
    const snapshot = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as Restaurant[];
  } catch (error) {
    console.error("Error finding restaurants in franchise:", error);
    return [];
  }
};

// Find active restaurants in a franchise
export const findActiveRestaurantsInFranchise = async (
  franchiseId: string
): Promise<Restaurant[]> => {
  try {
    const snapshot = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .where('isActive', '==', true)
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as Restaurant[];
  } catch (error) {
    console.error("Error finding active restaurants in franchise:", error);
    return [];
  }
};

// Update restaurant in franchise
export const updateRestaurantInFranchise = async (
  franchiseId: string,
  restaurantId: string,
  updates: Partial<Restaurant>
): Promise<Restaurant | null> => {
  try {
    const updateData = {
      ...updates,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .update(updateData);

    return findRestaurantByIdInFranchise(franchiseId, restaurantId);
  } catch (error) {
    console.error("Error updating restaurant in franchise:", error);
    return null;
  }
};

// Delete restaurant from franchise
export const deleteRestaurantFromFranchise = async (
  franchiseId: string,
  restaurantId: string
): Promise<boolean> => {
  try {
    await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .delete();
    return true;
  } catch (error) {
    console.error("Error deleting restaurant from franchise:", error);
    return false;
  }
};

// Toggle restaurant active status in franchise
export const toggleRestaurantActiveStatusInFranchise = async (
  franchiseId: string,
  restaurantId: string
): Promise<Restaurant | null> => {
  try {
    const restaurant = await findRestaurantByIdInFranchise(franchiseId, restaurantId);
    if (!restaurant) {
      return null;
    }

    const updatedRestaurant = await updateRestaurantInFranchise(franchiseId, restaurantId, {
      isActive: !restaurant.isActive,
    });

    return updatedRestaurant;
  } catch (error) {
    console.error("Error toggling restaurant active status in franchise:", error);
    return null;
  }
};

// Get restaurants count in franchise
export const getRestaurantsCountInFranchise = async (
  franchiseId: string
): Promise<number> => {
  try {
    const snapshot = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .get();

    return snapshot.size;
  } catch (error) {
    console.error("Error getting restaurants count in franchise:", error);
    return 0;
  }
};

// Get active restaurants count in franchise
export const getActiveRestaurantsCountInFranchise = async (
  franchiseId: string
): Promise<number> => {
  try {
    const snapshot = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .where('isActive', '==', true)
      .get();

    return snapshot.size;
  } catch (error) {
    console.error("Error getting active restaurants count in franchise:", error);
    return 0;
  }
};

