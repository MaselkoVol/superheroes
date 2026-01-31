import { z } from "zod";

export const SuperheroSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, "Nickname is too short")
    .max(50, "Nickname should be no longer than 100 characters"),
  realName: z
    .string()
    .trim()
    .min(2, "Real name is required")
    .max(50, "Real name should be no longer than 100 characters"),
  originDescription: z
    .string()
    .trim()
    .min(20, "Description should be at least 20 characters long")
    .max(500, "Keep it under 500 characters"),
  catchPhrase: z
    .string()
    .trim()
    .min(2, "Catch phrase can't be so short")
    .max(100, "Catch phrase should be no longer than 100 characters"),
});

export type SuperheroFormData = z.infer<typeof SuperheroSchema>;
