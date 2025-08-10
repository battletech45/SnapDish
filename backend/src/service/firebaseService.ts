import admin from "firebase-admin";
import path from "path";

const serviceAccount = path.join(__dirname, "snapdish-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
