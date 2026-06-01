import { Router, type Request, type Response } from "express";

export const webhooksRouter = Router();

const SUPPORTED_PROVIDERS = new Set(["shopify"]);

webhooksRouter.post("/:provider", (req: Request, res: Response) => {
  const { provider } = req.params;

  if (!provider || !SUPPORTED_PROVIDERS.has(provider)) {
    res.status(400).json({ error: `Unsupported provider: ${provider ?? ""}` });
    return;
  }

  // TODO: verify HMAC signature before processing
  // TODO: enqueue event in Redis for async processing

  console.log(`Received webhook from ${provider}`, {
    topic: req.headers["x-shopify-topic"],
    shopDomain: req.headers["x-shopify-shop-domain"],
  });

  // Acknowledge immediately — processing happens asynchronously.
  res.status(200).json({ received: true });
});
