import { Restaurant } from "../type/restaurantType";
import admin, { firestore } from "../service/firebaseService";

const restaurantsCollection = firestore.collection("restaurants");

// Create a new restaurant
export const createRestaurant = async (
  restaurant: Omit<Restaurant, "id" | "createdAt" | "updatedAt">
): Promise<Restaurant> => {
  try {
    const now = new Date();
    const restaurantData = {
      ...restaurant,
      createdAt: admin.firestore.Timestamp.fromDate(now),
      updatedAt: admin.firestore.Timestamp.fromDate(now),
    };

    const docRef = await restaurantsCollection.add(restaurantData);
    return {
      id: docRef.id,
      ...restaurant,
      createdAt: now,
      updatedAt: now,
    };
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw error;
  }
};

// Find restaurant by ID
export const findRestaurantById = async (
  id: string
): Promise<Restaurant | null> => {
  try {
    const doc = await restaurantsCollection.doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt?.toDate() || new Date(),
      updatedAt: data?.updatedAt?.toDate() || new Date(),
    } as Restaurant;
  } catch (error) {
    console.error("Error finding restaurant by ID:", error);
    return null;
  }
};

// Find restaurants by owner ID
export const findRestaurantsByOwnerId = async (
  ownerId: string
): Promise<Restaurant[]> => {
  try {
    const snapshot = await restaurantsCollection
      .where("ownerId", "==", ownerId)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Restaurant[];
  } catch (error) {
    console.error("Error finding restaurants by owner ID:", error);
    return [];
  }
};

// Find active restaurants by owner ID
export const findActiveRestaurantsByOwnerId = async (
  ownerId: string
): Promise<Restaurant[]> => {
  try {
    const snapshot = await restaurantsCollection
      .where("ownerId", "==", ownerId)
      .where("isActive", "==", true)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Restaurant[];
  } catch (error) {
    console.error("Error finding active restaurants by owner ID:", error);
    return [];
  }
};

// Find restaurants by name (search functionality)
export const findRestaurantsByName = async (
  name: string
): Promise<Restaurant[]> => {
  try {
    const snapshot = await restaurantsCollection
      .where("name", ">=", name)
      .where("name", "<=", name + "\uf8ff")
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Restaurant[];
  } catch (error) {
    console.error("Error finding restaurants by name:", error);
    return [];
  }
};

// Get all restaurants
export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const snapshot = await restaurantsCollection.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Restaurant[];
  } catch (error) {
    console.error("Error getting all restaurants:", error);
    return [];
  }
};

// Get all active restaurants
export const getAllActiveRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const snapshot = await restaurantsCollection
      .where("isActive", "==", true)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Restaurant[];
  } catch (error) {
    console.error("Error getting all active restaurants:", error);
    return [];
  }
};

// Update restaurant
export const updateRestaurant = async (
  id: string,
  updates: Partial<Omit<Restaurant, "id" | "createdAt" | "updatedAt">>
): Promise<Restaurant | null> => {
  try {
    const updateData = {
      ...updates,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    await restaurantsCollection.doc(id).update(updateData);
    return findRestaurantById(id);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return null;
  }
};

// Delete restaurant
export const deleteRestaurant = async (id: string): Promise<boolean> => {
  try {
    await restaurantsCollection.doc(id).delete();
    return true;
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return false;
  }
};

// Toggle restaurant active status
export const toggleRestaurantActiveStatus = async (
  id: string
): Promise<Restaurant | null> => {
  try {
    const restaurant = await findRestaurantById(id);
    if (!restaurant) {
      return null;
    }

    const updatedRestaurant = await updateRestaurant(id, {
      isActive: !restaurant.isActive,
    });

    return updatedRestaurant;
  } catch (error) {
    console.error("Error toggling restaurant active status:", error);
    return null;
  }
};

// Check if user owns restaurant
export const isRestaurantOwner = async (
  restaurantId: string,
  userId: string
): Promise<boolean> => {
  try {
    const restaurant = await findRestaurantById(restaurantId);
    return restaurant?.ownerId === userId;
  } catch (error) {
    console.error("Error checking restaurant ownership:", error);
    return false;
  }
};

// Get restaurants count by owner
export const getRestaurantsCountByOwner = async (
  ownerId: string
): Promise<number> => {
  try {
    const snapshot = await restaurantsCollection
      .where("ownerId", "==", ownerId)
      .get();

    return snapshot.size;
  } catch (error) {
    console.error("Error getting restaurants count by owner:", error);
    return 0;
  }
};

// Get active restaurants count by owner
export const getActiveRestaurantsCountByOwner = async (
  ownerId: string
): Promise<number> => {
  try {
    const snapshot = await restaurantsCollection
      .where("ownerId", "==", ownerId)
      .where("isActive", "==", true)
      .get();

    return snapshot.size;
  } catch (error) {
    console.error("Error getting active restaurants count by owner:", error);
    return 0;
  }
};

// Search restaurants with pagination
export const searchRestaurants = async (
  searchTerm: string,
  limit: number = 10,
  offset: number = 0
): Promise<Restaurant[]> => {
  try {
    let query = restaurantsCollection
      .where("isActive", "==", true)
      .orderBy("name")
      .limit(limit)
      .offset(offset);

    // If search term is provided, filter by name
    if (searchTerm) {
      query = restaurantsCollection
        .where("isActive", "==", true)
        .where("name", ">=", searchTerm)
        .where("name", "<=", searchTerm + "\uf8ff")
        .orderBy("name")
        .limit(limit)
        .offset(offset);
    }

    const snapshot = await query.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Restaurant[];
  } catch (error) {
    console.error("Error searching restaurants:", error);
    return [];
  }
};

// Bulk update restaurants (for admin operations)
export const bulkUpdateRestaurants = async (
  restaurantIds: string[],
  updates: Partial<Omit<Restaurant, "id" | "createdAt" | "updatedAt">>
): Promise<boolean> => {
  try {
    const batch = firestore.batch();
    const updateData = {
      ...updates,
      updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    restaurantIds.forEach((id) => {
      const docRef = restaurantsCollection.doc(id);
      batch.update(docRef, updateData);
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error bulk updating restaurants:", error);
    return false;
  }
};

// Get restaurants with statistics
export const getRestaurantsWithStats = async (
  ownerId?: string
): Promise<{
  restaurants: Restaurant[];
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
}> => {
  try {
    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      restaurantsCollection;

    if (ownerId) {
      query = query.where("ownerId", "==", ownerId);
    }

    const snapshot = await query.get();
    const restaurants = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    })) as Restaurant[];

    const totalCount = restaurants.length;
    const activeCount = restaurants.filter((r) => r.isActive).length;
    const inactiveCount = totalCount - activeCount;

    return {
      restaurants,
      totalCount,
      activeCount,
      inactiveCount,
    };
  } catch (error) {
    console.error("Error getting restaurants with stats:", error);
    return {
      restaurants: [],
      totalCount: 0,
      activeCount: 0,
      inactiveCount: 0,
    };
  }
};
