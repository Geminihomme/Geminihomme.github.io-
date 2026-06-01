import express from "express";

import { healthRouter } from "./routes/health.js";
import { oauthRouter } from "./routes/oauth.js";
import { webhooksRouter } from "./routes/webhooks.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/health", healthRouter);
app.use("/webhooks", webhooksRouter);
app.use("/oauth", oauthRouter);

// 404 catch-all
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Unhandled error handler
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = Number(process.env["API_PORT"] ?? 4000);

app.listen(PORT, () => {
  console.log(`Trewe API listening on http://localhost:${PORT}`);
});

export { app };
