import { z } from "zod";

export const numberSchema = z
  .union([z.number(), z.string()])
  .refine(
    (value) => {
      if (typeof value === "string") {
        const parsed = parseInt(value, 10);
        return !isNaN(parsed) && Number.isInteger(parsed);
      }
      return Number.isInteger(value);
    },
    { message: "Ikke et tal" }
  )
  .transform((value) =>
    typeof value === "string" ? parseInt(value, 10) : value
  )
  .refine((value) => value >= 0, {
    message: "Talet skal være positivt",
  });
export const menuItemSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Navn skal være mindst 2 tegn.",
    })
    .max(50, {
      message: "Navn skal være højst 50 tegn.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Beskrivelse skal være mindst 10 tegn.",
    })
    .max(500, {
      message: "Beskrivelse skal være højst 500 tegn.",
    }),
  price: numberSchema,
  category: z.string(),
  is_active: z.boolean(),
  is_sold_out: z.boolean(),
  is_lacking_ingredient: z.boolean(),
  comment: z
    .string()
    .max(500, {
      message: "Kommentaren skal være højst 500 tegn.",
    })
    .optional(),
});
