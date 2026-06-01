import { createHmac } from "node:crypto";

import { AuthenticatedHttpClient } from "../shared/http-client.js";

export interface ShopifyConfig {
  shopDomain: string;
  accessToken: string;
  apiVersion?: string;
}

export interface ShopifyOrder {
  id: number;
  name: string;
  email: string;
  total_price: string;
  financial_status: string;
  fulfillment_status: string | null;
  created_at: string;
  updated_at: string;
}

export interface ShopifyOrdersResponse {
  orders: ShopifyOrder[];
}

export interface ShopifyProduct {
  id: number;
  title: string;
  vendor: string;
  product_type: string;
  status: "active" | "archived" | "draft";
  created_at: string;
  updated_at: string;
}

export interface ShopifyProductsResponse {
  products: ShopifyProduct[];
}

export class ShopifyConnector {
  private readonly client: AuthenticatedHttpClient;
  private readonly apiVersion: string;

  constructor(config: ShopifyConfig) {
    this.apiVersion = config.apiVersion ?? "2024-04";
    this.client = new AuthenticatedHttpClient(
      `https://${config.shopDomain}/admin/api/${this.apiVersion}`,
      {
        "X-Shopify-Access-Token": config.accessToken,
      },
    );
  }

  async getOrders(params: { limit?: number; status?: string } = {}): Promise<ShopifyOrder[]> {
    const query = new URLSearchParams();
    if (params.limit) query.set("limit", String(params.limit));
    if (params.status) query.set("status", params.status);

    const qs = query.toString();
    const path = `/orders.json${qs ? `?${qs}` : ""}`;

    const res = await this.client.get<ShopifyOrdersResponse>(path);
    return res.orders;
  }

  async getProducts(params: { limit?: number } = {}): Promise<ShopifyProduct[]> {
    const query = new URLSearchParams();
    if (params.limit) query.set("limit", String(params.limit));

    const qs = query.toString();
    const path = `/products.json${qs ? `?${qs}` : ""}`;

    const res = await this.client.get<ShopifyProductsResponse>(path);
    return res.products;
  }

  // Verify that a webhook HMAC signature is valid before processing the payload.
  static verifyWebhookHmac(rawBody: string, hmacHeader: string, secret: string): boolean {
    const digest = createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");
    return digest === hmacHeader;
  }
}
