import { Router, type Request, type Response } from "express";

export const oauthRouter = Router();

const SUPPORTED_PROVIDERS = new Set(["shopify"]);

oauthRouter.get("/:provider/callback", (req: Request, res: Response) => {
  const { provider } = req.params;

  if (!provider || !SUPPORTED_PROVIDERS.has(provider)) {
    res.status(400).json({ error: `Unsupported provider: ${provider ?? ""}` });
    return;
  }

  const { code, shop, state, hmac } = req.query as Record<string, string | undefined>;

  if (!code || !shop) {
    res.status(400).json({ error: "Missing required OAuth parameters" });
    return;
  }

  // TODO: validate state / hmac
  // TODO: exchange code for access token
  // TODO: persist token in oauth_tokens table
  // TODO: redirect to dashboard

  console.log(`OAuth callback for ${provider}`, { shop, state, hmac });

  res.json({ provider, shop, status: "callback_received" });
});
