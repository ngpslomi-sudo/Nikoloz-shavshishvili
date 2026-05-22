import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini API Client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.post("/api/generate-letter", async (req, res) => {
  try {
    const { recipient, sender, style, prompts } = req.body;
    
    let styleInstruction = "warm, deep, and elegant style";
    if (style === "handwritten") {
       styleInstruction = "deeply romantic, artistic, nostalgic, resembling a standard hand-written private correspondence with poetic pauses";
    } else if (style === "classic-type") {
       styleInstruction = "poetic, slightly retro, short and expressive sentences";
    }

    const sysInstruction = `You are a professional romantic poet and copywriter.
Write a personalized love letter in the GEORGIAN language (using Mkhedruli font, e.g. 'გამარჯობა ჩემო ტკბილო...').
Make it extremely beautiful, emotional, heartwarming, and sincere. Avoid dry, cliché patterns. It should sound genuine, passionate, and warm.
The letter is written for '${recipient || 'სიყვარულო'}' from '${sender || 'შენი მეორე ნახევარი'}'.
The styling should be: ${styleInstruction}.
Incorporate the following personal memories/touchpoints if provided: "${prompts || 'none'}".
Keep the overall length of the letter between 150-250 words. Divide it into 2 or 3 beautiful paragraphs.`;

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "დამიწერე საუკეთესო სასიყვარულო წერილი ზემოთ მითითებული ინსტრუქციების საფუძველზე.",
      config: {
        systemInstruction: sysInstruction,
        temperature: 0.9,
      }
    });

    const text = response.text || "";
    res.json({ success: true, letter: text.trim() });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate romantic letter" });
  }
});

// AI Helper to generate custom cute Reasons
app.post("/api/generate-reasons", async (req, res) => {
  try {
    const { recipient, sender, style } = req.body;
    const ai = getAiClient();
    
    const sysInstruction = `You are a sweet relationship consultant.
Generate exactly 8 highly unique, creative, cute reasons why one might love their partner in the GEORGIAN language.
Specifically personalized for '${recipient}' from '${sender}'.
It should be warm, funny occasionally, deeply endearing.
Keep each reason to exactly 1 short, highly expressive sentence ending with a suitable emoji (like 😊, 👀, 💕, ✨).
Return the result strictly as a clean JSON representation containing an array of exactly 8 strings. No markdown backticks, no markdown 'json' tags, just pure JSON output.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Generate the 8 love reasons in Georgian as a JSON array.",
      config: {
        systemInstruction: sysInstruction,
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "[]";
    const reasons = JSON.parse(text.trim());
    res.json({ success: true, reasons });
  } catch (error: any) {
    console.error("Reasons generation error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate love reasons" });
  }
});

// Vite server middleware setup for dev vs production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Development Server is active at http://localhost:${PORT}`);
  });
}

startServer();
