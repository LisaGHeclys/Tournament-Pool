import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let db: ReturnType<typeof getFirestore> | null;

const getApp = () => {
  const apps = getApps();
  if (apps.length > 0) return apps[0];
  return initializeApp({
    credential: cert({
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
    }),
  });
};

export const getDb = () => {
  if (!db) db = getFirestore(getApp());
  return db;
};
