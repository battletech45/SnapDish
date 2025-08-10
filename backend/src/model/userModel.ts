import { User } from "../type/userType";

// In-memory array for example purposes
const users: User[] = [];

export const findUserByUid = (uid: string) => {
  return users.find((user) => user.uid === uid) || null;
};

export const createUser = (user: User) => {
  users.push(user);
  return user;
};
