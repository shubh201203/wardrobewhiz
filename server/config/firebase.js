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

// Check if credentials exist as an environment variable (for Render/Deployment)
// Or as a physical file (for Local Development)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    console.log("🔥 Firebase Firestore Initialized via Environment Variable");
  } catch (error) {
    console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", error);
  }
} else if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  db = admin.firestore();
  console.log("🔥 Firebase Firestore Initialized via Local JSON file");
} else {
  console.log("⚠️ WARNING: No Firebase credentials found (env var or local file).");
  db = {
    collection: () => ({
      get: async () => ({ docs: [] }),
      add: async () => ({ id: 'mock_id' }),
      doc: () => ({ 
        collection: () => ({ 
          get: async () => ({ docs: [] }),
          add: async () => ({ id: 'mock_id' }),
          doc: () => ({ delete: async () => ({}) })
        })
      })
    })
  };
}

export { admin, db };
