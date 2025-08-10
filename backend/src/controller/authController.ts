import { Request, Response } from "express";
import admin from "../service/firebaseService";
import { findUserByUid, createUser } from "../model/userModel";
import logger from "../util/logger";

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
      res.status(201).json(newUser);
    }
    res.status(200).json(user);
  } catch (error) {
    logger.error("Error verifying idToken", error);
    return res.status(401).json({ error: "Invalid idToken" });
  }
};
