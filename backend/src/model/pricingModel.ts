import { ItemPricing, ExtraPricing } from "../type/restaurantType";
import admin, { firestore } from "../service/firebaseService";

// Create item pricing in a restaurant
export const createItemPricingInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  itemPricing: ItemPricing
): Promise<ItemPricing> => {
  try {
    const now = new Date();
    const itemPricingData = {
      ...itemPricing,
      createdAt: admin.firestore.Timestamp.fromDate(now),
    };

    const docRef = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('itemPricing')
      .add(itemPricingData);

    return itemPricingData as unknown as ItemPricing;
  } catch (error) {
    console.error("Error creating item pricing in restaurant:", error);
    throw error;
  }
};

// Create extra pricing in a restaurant
export const createExtraPricingInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  extraPricing: Omit<ExtraPricing, 'id' | 'createdAt'>
): Promise<ExtraPricing> => {
  try {
    const now = new Date();
    const extraPricingData = {
      ...extraPricing,
      createdAt: admin.firestore.Timestamp.fromDate(now),
    };

    const docRef = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('extraPricing')
      .add(extraPricingData);

    return extraPricingData as unknown as ExtraPricing;
  } catch (error) {
    console.error("Error creating extra pricing in restaurant:", error);
    throw error;
  }
};

// Find item pricing by ID in restaurant
export const findItemPricingByIdInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  itemPricingId: string
): Promise<ItemPricing | null> => {
  try {
    const doc = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('itemPricing')
      .doc(itemPricingId)
      .get();

    if (!doc.exists) return null;

    const data = doc.data();
    return data as unknown as ItemPricing;
  } catch (error) {
    console.error("Error finding item pricing by ID in restaurant:", error);
    return null;
  }
};

// Find extra pricing by ID in restaurant
export const findExtraPricingByIdInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  extraPricingId: string
): Promise<ExtraPricing | null> => {
  try {
    const doc = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('extraPricing')
      .doc(extraPricingId)
      .get();

    if (!doc.exists) return null;

    const data = doc.data();
    return data as unknown as ExtraPricing;
  } catch (error) {
    console.error("Error finding extra pricing by ID in restaurant:", error);
    return null;
  }
};

// Find all item pricing in a restaurant
export const findItemPricingInRestaurant = async (
  franchiseId: string,
  restaurantId: string
): Promise<ItemPricing[]> => {
  try {
    const snapshot = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('itemPricing')
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as ItemPricing[];
  } catch (error) {
    console.error("Error finding item pricing in restaurant:", error);
    return [];
  }
};

// Find all extra pricing in a restaurant
export const findExtraPricingInRestaurant = async (
  franchiseId: string,
  restaurantId: string
): Promise<ExtraPricing[]> => {
  try {
    const snapshot = await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('extraPricing')
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as ExtraPricing[];
  } catch (error) {
    console.error("Error finding extra pricing in restaurant:", error);
    return [];
  }
};

// Update item pricing in restaurant
export const updateItemPricingInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  itemPricingId: string,
  updates: Partial<ItemPricing>
): Promise<ItemPricing | null> => {
  try {
    await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('itemPricing')
      .doc(itemPricingId)
      .update(updates);

    return findItemPricingByIdInRestaurant(franchiseId, restaurantId, itemPricingId);
  } catch (error) {
    console.error("Error updating item pricing in restaurant:", error);
    return null;
  }
};

// Update extra pricing in restaurant
export const updateExtraPricingInRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  extraPricingId: string,
  updates: Partial<ExtraPricing>
): Promise<ExtraPricing | null> => {
  try {
    await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('extraPricing')
      .doc(extraPricingId)
      .update(updates);

    return findExtraPricingByIdInRestaurant(franchiseId, restaurantId, extraPricingId);
  } catch (error) {
    console.error("Error updating extra pricing in restaurant:", error);
    return null;
  }
};

// Delete item pricing from restaurant
export const deleteItemPricingFromRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  itemPricingId: string
): Promise<boolean> => {
  try {
    await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('itemPricing')
      .doc(itemPricingId)
      .delete();
    return true;
  } catch (error) {
    console.error("Error deleting item pricing from restaurant:", error);
    return false;
  }
};

// Delete extra pricing from restaurant
export const deleteExtraPricingFromRestaurant = async (
  franchiseId: string,
  restaurantId: string,
  extraPricingId: string
): Promise<boolean> => {
  try {
    await firestore
      .collection('franchises')
      .doc(franchiseId)
      .collection('restaurants')
      .doc(restaurantId)
      .collection('extraPricing')
      .doc(extraPricingId)
      .delete();
    return true;
  } catch (error) {
    console.error("Error deleting extra pricing from restaurant:", error);
    return false;
  }
};
