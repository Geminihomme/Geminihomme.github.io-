import { getPool, closePool } from "../client.js";

async function seed(): Promise<void> {
  const pool = getPool();

  console.log("Seeding development data...");

  await pool.query(`
    INSERT INTO merchants (shop_domain, name, email)
    VALUES
      ('demo-store.myshopify.com', 'Demo Store',   'demo@example.com'),
      ('test-shop.myshopify.com',  'Test Shop',    'test@example.com')
    ON CONFLICT (shop_domain) DO NOTHING
  `);

  console.log("  ✓ Merchants seeded");
  console.log("Done.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
  })
  .finally(() => closePool());
