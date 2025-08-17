import { Franchise } from "../type/franchiseType";
import admin, { firestore } from "../service/firebaseService";

const franchisesCollection = firestore.collection('franchises');

export const createFranchise = async (franchise: Franchise) => {
  try {
    const now = new Date();
    const franchiseData = {
      ...franchise,
      createdAt: admin.firestore.Timestamp.fromDate(now),
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };
    const docRef = await franchisesCollection.add(franchiseData);
    return franchiseData as unknown as Franchise;
  } catch (error) {
    console.error("Error creating franchise:", error);
    throw error;
  }
};

export const findFranchiseById = async (id: string) => {
  try {
    const doc = await franchisesCollection.doc(id).get();
    return doc.data() as Franchise;
  } catch (error) {
    console.error("Error finding franchise by id:", error);
    throw error;
  }
};

export const findFranchises = async () => {
  try {
    const snapshot = await franchisesCollection.get();
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as Franchise[];
  } catch (error) {
    console.error("Error finding franchises:", error);
    return [];
  }
};

export const updateFranchise = async (id: string, updates: Partial<Franchise>) => {
  try {
    const updateData = {
      ...updates,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };
    await franchisesCollection.doc(id).update(updateData);
    return findFranchiseById(id);
  } catch (error) {
    console.error("Error updating franchise:", error);
    return null;
  }
};

export const deleteFranchise = async (id: string) => {  
  try {
    await franchisesCollection.doc(id).delete();
    return true;
  } catch (error) {
    console.error("Error deleting franchise:", error);
    return false;
  }
};