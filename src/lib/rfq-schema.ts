import { z } from "zod";

export const rfqItemSchema = z.object({
  productId: z.number().int().positive(),
  requestedForm: z.string().max(100).optional(),
  requestedSize: z.string().max(100).optional(),
  estimatedQuantity: z
    .string()
    .trim()
    .min(1, "Estimated quantity is required.")
    .max(100),
});

export const rfqSchema = z.object({
  buyerName: z.string().trim().min(1, "Buyer name is required.").max(150),
  companyName: z.string().trim().min(1, "Company name is required.").max(150),
  country: z.string().trim().min(1, "Country is required.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(150),
  phoneWhatsapp: z.string().trim().max(50).optional(),
  preferredIncoterm: z.enum(["FOB_JAKARTA", "FOB_BELITUNG", "CIF", "CNF"]),
  shippingMode: z.enum(["SEA_REEFER", "AIR_CARGO"]),
  destinationPort: z.string().trim().max(150).optional(),
  additionalNotes: z.string().trim().max(2000).optional(),
  items: z.array(rfqItemSchema).min(1, "Add at least one product."),
});

export type RfqInput = z.infer<typeof rfqSchema>;
