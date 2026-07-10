import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import * as cheerio from "cheerio";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the snapsave logic
// I will inline the essential logic here or use the file I'll create
// Given the complexity of the obfuscated code, I'll try to provide a cleaner implementation
// that mimics what these tools usually do (scraping SnapSave or similar).

async function snapsave(url: string) {
  try {
    const resp = await axios.post(
      "https://snapsave.app/action.php?lang=en",
      new URLSearchParams({ url }).toString(),
      {
        headers: {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "origin": "https://snapsave.app",
          "referer": "https://snapsave.app/",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        },
      }
    );

    const data = resp.data;
    // The response often contains executed JS that we need to parse.
    // This is simplified. Real logic usually involves decoding the packed script.
    return data; 
  } catch (err) {
    console.error("SnapSave error:", err);
    throw err;
  }
}

// Fallback logic for Instagram downloading if SnapSave fails or is too complex
// Many APIs use Instagram's own internal data or third party savers.
function unpack(p: string, a: number, c: number, k: any[], e?: any, d?: any) {
  const dc = (c: number) => {
    return (c < a ? "" : dc(Math.floor(c / a))) + ((c %= a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
  };
  if (!"".replace(/^/, String)) {
    while (c--) d[dc(c)] = k[c] || dc(c);
    k = [
      (e: any) => {
        return d[e];
      },
    ];
    e = () => {
      return "\\w+";
    };
    c = 1;
  }
  while (c--)
    if (k[c]) p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
  return p;
}

async function downloadInstagram(url: string) {
  try {
    const data = new URLSearchParams({
      url: url,
      lang: "en"
    });

    const response = await axios.post("https://snapsave.app/action.php?lang=en", data.toString(), {
      headers: {
        "accept": "*/*",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "origin": "https://snapsave.app",
        "referer": "https://snapsave.app/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
      }
    });

    const body = response.data;
    let html = "";
    
    if (typeof body === "string") {
      if (body.includes("eval(function(p,a,c,k,e,d)")) {
        // More robust extraction of packer parameters
        const match = body.match(/}\((.+)\)\s*$/) || body.match(/}\((.+)\);?\s*$/);
        if (match) {
          const params = match[1];
          // The params are basically: "p", a, c, "k".split("|"), 0, {}
          // We need p, a, c, and k.
          const pMatch = params.match(/^["'](.+)["']\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*["'](.+)["']\.split/);
          if (pMatch) {
            const p = pMatch[1];
            const a = parseInt(pMatch[2]);
            const c = parseInt(pMatch[3]);
            const k = pMatch[4].split("|");
            
            try {
              html = unpack(p, a, c, k, {}, {});
            } catch (err) {
              console.error("Unpacker error:", err);
            }
          }
        }
      } else {
        html = body;
      }
    }

    if (html) {
      const $ = cheerio.load(html);
      // Snapsave usually puts the link in a <tr> with a download button
      const videoUrl = $(".download-main-btn").attr("href") || $("video").attr("src") || $("a.btn-download").attr("href") || $(".download-items__btn a").attr("href");
      if (videoUrl) {
        // Sometimes the URL is relative or needs fixing
        if (videoUrl.startsWith('/')) {
          return "https://snapsave.app" + videoUrl;
        }
        return videoUrl;
      }
    }

    // Secondary method: Try another downloader if Snapsave fails
    // Here we could try fastdll.app or similar if needed.
    
    // For now, let's try a direct scrape with a mobile user agent which sometimes reveals more
    const directResponse = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });
    const $direct = cheerio.load(directResponse.data);
    const ogVideo = $direct('meta[property="og:video"]').attr('content');
    if (ogVideo) return ogVideo;

    return null;
  } catch (e) {
    console.error("Download error:", e);
    return null;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/api/igdl", async (req, res) => {
    const { url } = req.query;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      const result = await downloadInstagram(url);
      if (result) {
        res.json({ url: result });
      } else {
        res.status(404).json({ 
          error: "Could not find video URL. This can happen for private posts, expired links, or if the service is temporarily throttled. Please try again with a public Instragram link." 
        });
      }
    } catch (error: any) {
      console.error("API error:", error);
      res.status(500).json({ error: "Internal server error while processing the request." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
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
