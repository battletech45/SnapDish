import { Request, Response } from "express";
import admin from "../service/firebaseService";
import { findUserByUid, createUser } from "../model/userModel";
import logger from "../util/logger";

export const emailLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const token = await admin.auth().createCustomToken(user.uid);
    return res.status(200).json({ token });
  } catch (error) {
    logger.error("Error verifying email", error);
    return res.status(401).json({ error: "Invalid email or password" });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "No idToken provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, displayName, photoURL, emailVerified, phoneNumber } =
      decodedToken.claims;

    const user = findUserByUid(uid);
    if (!user) {
      const newUser = createUser({
        uid,
        email,
        displayName,
        photoURL,
        emailVerified,
        phoneNumber,
      });
      return res.status(201).json(newUser);
    }
    return res.status(200).json(user);
  } catch (error) {
    logger.error("Error verifying idToken", error);
    return res.status(401).json({ error: "Invalid idToken" });
  }
};
