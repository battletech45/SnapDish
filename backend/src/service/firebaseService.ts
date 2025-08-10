import admin from "firebase-admin";
import path from "path";

// Fix the path to point to the correct location of the service account file
const serviceAccount = path.join(__dirname, "..", "..", "snapdish-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
