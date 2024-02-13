import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  S3_BUCKET_NAME: z.string(),
  S3_BUCKET_REGION: z.string(),
  S3_BUCKET_ACCESS_KEY_ID: z.string(),
  S3_BUCKET_SECRET_ACCESS_KEY: z.string(),
});
export const env = envSchema.parse(process.env);
