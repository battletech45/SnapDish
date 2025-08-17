import admin, { firestore } from "../service/firebaseService";
import { User } from "../type/userType";

const usersCollection = firestore.collection("users");

export const findUserByUid = async (uid: string): Promise<User | null> => {
  const doc = await usersCollection.doc(uid).get();
  if (!doc.exists) return null;

  const data = doc.data();
  return {
    ...data
  } as User;
};

export const createUser = async (user: User) => {
  const now = new Date();
  const userData = {
    ...user,
    createdAt: admin.firestore.Timestamp.fromDate(now),
    updatedAt: admin.firestore.Timestamp.fromDate(now),
  };
  await usersCollection.doc(user.uid).set(userData);
  return user;
};
