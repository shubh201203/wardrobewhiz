import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define path to the service account JSON
const serviceAccountPath = path.resolve(__dirname, '../serviceAccountKey.json');

let db;

// Check if credentials exist to avoid crashing
if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  db = admin.firestore();
  console.log("🔥 Firebase Firestore Initialized Successfully");
} else {
  console.log("⚠️ WARNING: /server/serviceAccountKey.json not found.");
  console.log("Firebase is skipping initialization. Please drop your key in the server folder!");
  
  // Create a mock DB object so the app doesn't crash while building out other endpoints
  db = {
    collection: () => ({
      get: async () => ({ docs: [] }),
      add: async () => ({ id: 'mock_id' })
    })
  };
}

export { admin, db };
