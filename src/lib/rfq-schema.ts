import { z } from "zod";

export const rfqItemSchema = z.object({
  productId: z.number().int().positive(),
  requestedForm: z.string().optional(),
  requestedSize: z.string().optional(),
  estimatedQuantity: z.string().trim().min(1, "Estimated quantity is required."),
});

export const rfqSchema = z.object({
  buyerName: z.string().trim().min(1, "Buyer name is required."),
  companyName: z.string().trim().min(1, "Company name is required."),
  country: z.string().trim().min(1, "Country is required."),
  email: z.string().trim().email("Enter a valid email address."),
  phoneWhatsapp: z.string().trim().optional(),
  preferredIncoterm: z.enum(["FOB_JAKARTA", "FOB_BELITUNG", "CIF", "CNF"]),
  shippingMode: z.enum(["SEA_REEFER", "AIR_CARGO"]),
  destinationPort: z.string().trim().optional(),
  additionalNotes: z.string().trim().optional(),
  items: z.array(rfqItemSchema).min(1, "Add at least one product."),
});

export type RfqInput = z.infer<typeof rfqSchema>;
