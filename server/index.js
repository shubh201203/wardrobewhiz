import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import { OpenAI } from "openai";
import { db } from "./config/firebase.js";

// We'll dynamically require TFJS node to handle graceful fallback if Windows errors out
let tf = null;
let mobilenet = null;
try {
  tf = await import("@tensorflow/tfjs-node");
  mobilenet = await import("@tensorflow-models/mobilenet");
} catch (e) {
  console.log("⚠️ tfjs-node could not be loaded. Ensure it's installed via: npm install @tensorflow/tfjs-node @tensorflow-models/mobilenet");
}

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Set up multer for image upload in memory
const upload = multer({ storage: multer.memoryStorage() });

// Optional: Preload MobileNet to avoid delay on first request
let model = null;
const loadModel = async () => {
  if (!mobilenet) return;
  try {
    console.log("Loading MobileNet model... This might take a few seconds (~20MB download).");
    model = await mobilenet.load({ version: 2, alpha: 1.0 });
    console.log("✅ MobileNet model loaded successfully.");
  } catch (error) {
    console.error("Failed to load MobileNet:", error);
  }
};
loadModel();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "YOUR_OPENAI_KEY_PLACEHOLDER"
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "WardrobeWhiz Engine is online 🚀" });
});

// Image Upload & Classification Route
app.post("/api/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided." });
  }

  try {
    if (!model || !tf) {
      return res.status(503).json({ error: "Model is not loaded or tfjs-node is missing." });
    }

    console.log("Analyzing uploaded image...");
    // Decode image buffer into a tensor
    const imageTensor = tf.node.decodeImage(req.file.buffer, 3);
    
    // Classify
    const predictions = await model.classify(imageTensor);
    
    // Cleanup memory
    imageTensor.dispose();

    // The predictions are sorted by probability
    res.json({
      message: "Image analyzed successfully",
      predictions
    });

  } catch (error) {
    console.error("Classification Error:", error);
    res.status(500).json({ error: "Failed to classify image." });
  }
});

// OpenAI Chat Stylist Route
app.post("/api/chat", async (req, res) => {
  const { query, wardrobeContext } = req.body;
  
  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const promptContext = `
      You are an expert fashion stylist AI. 
      The user has the following items in their wardrobe:
      ${JSON.stringify(wardrobeContext)}
      
      User asks: "${query}"
      
      Suggest an outfit ONLY using the user's wardrobe items if possible, and provide a smart reasoning.
    `;
    
    let reply = "I would process this via OpenAI, but I need a valid API key in the server's .env file!";
    
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "YOUR_OPENAI_KEY_PLACEHOLDER") {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful AI stylist." },
            { role: "user", content: promptContext }
          ],
          temperature: 0.7,
          max_tokens: 150
        });
        reply = response.choices[0].message.content;
    }

    res.json({ reply });

  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Failed to fetch response from Stylist AI." });
  }
});

// -------------------------
// DATABASE ROUTES (Firestore)
// -------------------------

// GET all wardrobe items for a user
app.get("/api/wardrobe", async (req, res) => {
  // In a real app with Auth, you would pass a userId auth token
  const userId = "demo_user";
  
  try {
    const snapshot = await db.collection("users").doc(userId).collection("wardrobe_items").get();
    const items = [];
    snapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
    });
    res.json(items);
  } catch (error) {
    console.error("Firebase GET Error:", error);
    res.status(500).json({ error: "Failed to fetch wardrobe data." });
  }
});

// POST a new wardrobe item
app.post("/api/wardrobe", async (req, res) => {
  const userId = "demo_user";
  const itemData = req.body;
  
  try {
    const docRef = await db.collection("users").doc(userId).collection("wardrobe_items").add(itemData);
    res.json({ id: docRef.id, ...itemData });
  } catch (error) {
    console.error("Firebase POST Error:", error);
    res.status(500).json({ error: "Failed to save item to database." });
  }
});

// DELETE a wardrobe item
app.delete("/api/wardrobe/:id", async (req, res) => {
  const userId = "demo_user";
  const { id } = req.params;
  
  try {
    await db.collection("users").doc(userId).collection("wardrobe_items").doc(id).delete();
    res.json({ success: true, message: `Item ${id} deleted successfully` });
  } catch (error) {
    console.error("Firebase DELETE Error:", error);
    res.status(500).json({ error: "Failed to delete item." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
