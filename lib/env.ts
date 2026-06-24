import { z } from "zod";

const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_FROM_EMAIL: z
    .string()
    .email()
    .default("Cajun Collectibles <onboarding@resend.dev>"),
  CONTACT_TO_EMAIL: z.string().email().optional(),
});

export const serverEnv = serverEnvSchema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
});

export const isContactConfigured = Boolean(
  serverEnv.RESEND_API_KEY && serverEnv.CONTACT_TO_EMAIL,
);
