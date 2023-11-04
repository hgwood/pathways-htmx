import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./db.sqlite",
  },
} satisfies Config;
