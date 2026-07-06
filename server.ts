import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Google Drive Video Proxy Route (API)
  app.get("/api/video-proxy", async (req, res) => {
    const { id } = req.query;
    if (!id) {
      return res.status(400).send("Missing Google Drive file id");
    }

    try {
      const driveUrl = `https://docs.google.com/uc?export=download&id=${id}`;

      // Fetch the Google Drive download page/file with headers mimicking a standard browser
      const response = await fetch(driveUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
          "Accept": "*/*",
        }
      });

      const contentType = response.headers.get("content-type") || "";

      // Check if it returned the HTML warning page (e.g. for virus scan confirmation or rate limit warning)
      if (contentType.includes("text/html")) {
        const htmlText = await response.text();
        const confirmMatch = htmlText.match(/confirm=([a-zA-Z0-9_-]+)/);

        if (confirmMatch && confirmMatch[1]) {
          const confirmCode = confirmMatch[1];
          const confirmUrl = `https://docs.google.com/uc?export=download&confirm=${confirmCode}&id=${id}`;

          const confirmResponse = await fetch(confirmUrl, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
            }
          });

          // Set streaming headers
          res.setHeader("Content-Type", "video/mp4");
          res.setHeader("Accept-Ranges", "bytes");
          const length = confirmResponse.headers.get("content-length");
          if (length) res.setHeader("Content-Length", length);

          const bodyReader = confirmResponse.body;
          if (bodyReader) {
            const reader = bodyReader.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              res.write(value);
            }
            res.end();
          } else {
            res.status(500).send("Failed to stream video body after confirmation");
          }
        } else {
          // If no confirmation code found, try fallback embed URL preview parsing or return the HTML page as a backup
          res.status(403).send("Bypass failed or rate limit hit on Google Drive download.");
        }
      } else {
        // Direct stream success
        res.setHeader("Content-Type", contentType || "video/mp4");
        res.setHeader("Accept-Ranges", "bytes");
        const length = response.headers.get("content-length");
        if (length) res.setHeader("Content-Length", length);

        const bodyReader = response.body;
        if (bodyReader) {
          const reader = bodyReader.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(value);
          }
          res.end();
        } else {
          res.status(500).send("Failed to stream video body directly");
        }
      }
    } catch (err: any) {
      console.error("Video proxy error:", err);
      res.status(500).send("Internal server error proxying video");
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // 2. Vite middleware or static files serving
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
