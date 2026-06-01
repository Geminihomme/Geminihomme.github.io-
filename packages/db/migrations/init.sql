-- Initial schema bootstrap.
-- This file is also mounted into the postgres container as an init script
-- so the schema is created automatically when the container first starts.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Merchants table
CREATE TABLE IF NOT EXISTS merchants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_domain TEXT        NOT NULL UNIQUE,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- OAuth tokens (one row per merchant + provider pair)
CREATE TABLE IF NOT EXISTS oauth_tokens (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id  UUID        NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  provider     TEXT        NOT NULL,
  access_token TEXT        NOT NULL,
  scope        TEXT,
  expires_at   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (merchant_id, provider)
);

-- Webhook event log
CREATE TABLE IF NOT EXISTS webhook_events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id  UUID        REFERENCES merchants(id) ON DELETE SET NULL,
  provider     TEXT        NOT NULL,
  topic        TEXT        NOT NULL,
  payload      JSONB       NOT NULL,
  processed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_merchant_id ON webhook_events(merchant_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_provider_topic ON webhook_events(provider, topic);
