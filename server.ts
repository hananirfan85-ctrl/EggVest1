import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI Client (Lazy check on request)
  const getGeminiAI = () => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return null;
    return new GoogleGenAI({ apiKey: key });
  };

  // --- REST API ENDPOINTS ---

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      platform: "OvumYield Enterprise Poultry Web Platform",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  // REST API Docs endpoint JSON
  app.get("/api/docs", (req, res) => {
    res.json({
      openapi: "3.0.0",
      info: {
        title: "OvumYield Enterprise Poultry REST API",
        version: "2.5.0",
        description: "Official REST API documentation for poultry investment management, egg yield calculations, wallet payments, and admin approval workflows."
      },
      servers: [{ url: "/api", description: "Production Gateway" }],
      endpoints: [
        { method: "GET", path: "/api/health", description: "Health check & runtime status" },
        { method: "GET", path: "/api/packages", description: "List active poultry investment packages" },
        { method: "POST", path: "/api/ai/advise", description: "AI Poultry Livestock Advisor powered by Gemini 2.5" },
        { method: "GET", path: "/api/docs", description: "API Documentation JSON" }
      ]
    });
  });

  // AI Livestock & Investor Assistant endpoint
  app.post("/api/ai/advise", async (req, res) => {
    try {
      const { prompt, userContext } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt parameter is required." });
      }

      const ai = getGeminiAI();
      if (!ai) {
        // Fallback intelligent response if API key isn't provided in local dev
        return res.json({
          reply: `[OvumYield AI Livestock Advisor] Regarding your query on "${prompt}": In commercial layer poultry management, optimal egg yields require 16 hours of light per day, 20-22°C shed temperature, and 18% protein laying mash. For investment returns, our packages deliver fixed daily payouts from automated egg distribution contracts.`
        });
      }

      const systemInstruction = `You are the Lead Poultry Scientist & Financial Analyst for OvumYield Enterprise Poultry Platform. Answer investor questions accurately regarding poultry farm operations, egg yield calculations (Grade-A egg crates, feed efficiency, mortality coverage), biosecurity, and investment returns. Be professional, clear, encouraging, and data-driven.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      return res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({ error: "Failed to query AI advisor", details: error.message });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OvumYield] Enterprise Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
