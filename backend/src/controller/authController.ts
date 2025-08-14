import { Request, Response } from "express";
import admin from "../service/firebaseService";
import { findUserByUid, createUser } from "../model/userModel";
import { apiResponse } from "../util/apiResponse";

export const emailLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return apiResponse.validationError(res, "Email and password are required");
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    if (!user) {
      return apiResponse.notFound(res, "User not found");
    }

    const token = await admin.auth().createCustomToken(user.uid);

    // Log successful login

    return apiResponse.success(res, { token }, "Login successful");
  } catch (error) {
    console.error("Error verifying email", error);
    return apiResponse.unauthorized(res, "Invalid email or password");
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  const { idToken } = req.body;

  if (!idToken) {
    return apiResponse.validationError(res, "No idToken provided");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, displayName, photoURL, emailVerified, phoneNumber } =
      decodedToken.claims;

    const user = findUserByUid(uid);
    if (!user) {
      const now = new Date();
      const newUser = createUser({
        uid,
        email,
        displayName,
        photoURL,
        emailVerified,
        phoneNumber,
        role: 'user', // Default role for new users
        ownedRestaurants: [], // Empty array for new users
        createdAt: now,
        updatedAt: now,
      });

      // Log user registration

      return apiResponse.created(res, newUser, "User created successfully");
    }

    // Log successful login

    return apiResponse.success(res, user, "Login successful");
  } catch (error) {
    console.error("Error verifying idToken", error);
    return apiResponse.unauthorized(res, "Invalid idToken");
  }
};
