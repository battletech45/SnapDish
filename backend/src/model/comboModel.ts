import { Combo } from "../type/comboType";
import admin, { firestore } from "../service/firebaseService";

const combosCollection = firestore.collection("combos");

export const findComboById = async (id: string): Promise<Combo | null> => {
  try {
    const doc = await combosCollection.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    return {
      ...data
    } as Combo;
  } catch (error) {
    console.error("Error finding combo by ID:", error);
    return null;
  }
};

export const findCombosByRestaurantId = async (
  restaurantId: string
): Promise<Combo[]> => {
  try { 
    const snapshot = await combosCollection
      .where("restaurantId", "==", restaurantId)
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data()
    })) as Combo[];
  } catch (error) {
    console.error("Error finding combos by restaurant ID:", error);
    return [];
  }
};

export const findActiveCombosByRestaurantId = async (
  restaurantId: string
): Promise<Combo[]> => {
  try {
    const snapshot = await combosCollection
      .where("restaurantId", "==", restaurantId)
      .where("isActive", "==", true)
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data()
    })) as Combo[];
  } catch (error) {
    console.error("Error finding active combos by restaurant ID:", error);
    return [];
  }
};

export const createCombo = async (
  combo: Combo
): Promise<Combo> => {
  try {
    const now = new Date();
    const comboData = {
      ...combo,
      createdAt: admin.firestore.Timestamp.fromDate(now),
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    const docRef = await combosCollection.add(comboData);
    return combo;
  } catch (error) {
    console.error("Error creating combo:", error);
    throw error;
  }
};

export const updateCombo = async (
  id: string,
  updates: Partial<Combo>
): Promise<Combo | null> => {
  try {
    const updateData = {
      ...updates,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    await combosCollection.doc(id).update(updateData);
    return findComboById(id);
  } catch (error) {
    console.error("Error updating combo:", error);
    return null;
  }
};

export const deleteCombo = async (id: string): Promise<boolean> => {
  try {
    await combosCollection.doc(id).delete();
    return true;
  } catch (error) {
    console.error("Error deleting combo:", error);
    return false;
  }
};

export const getAllCombos = async (): Promise<Combo[]> => {
  try {
    const snapshot = await combosCollection.get();
    return snapshot.docs.map((doc) => ({
      ...doc.data()
    })) as Combo[];
  } catch (error) {
    console.error("Error getting all combos:", error);
    return [];
  }
};

// Add item to combo
export const addItemToCombo = async (
  comboId: string,
  itemId: string
): Promise<Combo | null> => {
  try {
    const combo = await findComboById(comboId);
    if (!combo) return null;

    const now = new Date();
    const updatedProductIds = [...combo.productIds, itemId];

    const updateData = {
      productIds: updatedProductIds,
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    await combosCollection.doc(comboId).update(updateData);
    return findComboById(comboId);
  } catch (error) {
    console.error("Error adding item to combo:", error);
    return null;
  }
};

// Remove item from combo
export const removeItemFromCombo = async (
  comboId: string,
  itemId: string
): Promise<Combo | null> => {
  try {
    const combo = await findComboById(comboId);
    if (!combo) return null;

    const updatedProductIds = combo.productIds.filter((id) => id !== itemId);

    const updateData = {
      productIds: updatedProductIds,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    await combosCollection.doc(comboId).update(updateData);
    return findComboById(comboId);
  } catch (error) {
    console.error("Error removing item from combo:", error);
    return null;
  }
};
