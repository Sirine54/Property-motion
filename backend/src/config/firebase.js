// import admin from "firebase-admin";
// import fs from "fs";
// import dotenv from "dotenv";
// dotenv.config();

// const svcPath =
//   process.env.GOOGLE_APPLICATION_CREDENTIALS || "./serviceAccountKey.json";
// if (!fs.existsSync(svcPath)) {
//   console.error("Missing serviceAccountKey.json -> place it in backend/");
//   process.exit(1);
// }
// const serviceAccount = JSON.parse(fs.readFileSync(svcPath, "utf8"));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// });

// const db = admin.firestore();
// const bucket = admin.storage().bucket();

// export { admin, db, bucket };
