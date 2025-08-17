import { Extra } from "../type/extraType";
import admin, { firestore } from "../service/firebaseService";

export const createExtra = async (franchiseId: string, extra: Extra) => {
  try {
    const now = new Date();
    const extraData = {
      ...extra, 
      createdAt: admin.firestore.Timestamp.fromDate(now),
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    await firestore.collection('franchises').doc(franchiseId).collection('extras').add(extraData);
    return extraData as unknown as Extra;
  } catch (error) {
    console.error("Error creating extra:", error);
    throw error;
  }
};

export const findExtraById = async (franchiseId: string, extraId: string) => {
  try {
    const doc = await firestore.collection('franchises').doc(franchiseId).collection('extras').doc(extraId).get();
    return doc.data() as Extra;
  } catch (error) {
    console.error("Error finding extra by id:", error);
    throw error;
  }
};

export const findExtras = async (franchiseId: string) => {
  try {
    const snapshot = await firestore.collection('franchises').doc(franchiseId).collection('extras').get();
    return snapshot.docs.map((doc) => doc.data()) as Extra[];
  } catch (error) {
    console.error("Error finding extras:", error);
    return [];
  }
};

export const updateExtra = async (franchiseId: string, extraId: string, updates: Partial<Extra>) => {
  try {
    const now = new Date();
    const extraData = {
      ...updates,
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    await firestore.collection('franchises').doc(franchiseId).collection('extras').doc(extraId).update(extraData);
    return extraData as unknown as Extra;
  } catch (error) {
    console.error("Error updating extra:", error);
    throw error;
  }
}; 

export const deleteExtra = async (franchiseId: string, extraId: string) => {
  try {
    await firestore.collection('franchises').doc(franchiseId).collection('extras').doc(extraId).delete();
    return true;
  } catch (error) {
    console.error("Error deleting extra:", error);
    return false;
  }
};