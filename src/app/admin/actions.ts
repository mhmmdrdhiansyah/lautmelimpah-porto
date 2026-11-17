"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  COOKIE_NAME,
  checkAdminCredentials,
  createSessionToken,
  verifySessionToken,
} from "@/lib/auth";

async function requireAdmin() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const session = await verifySessionToken(token ?? "");
  if (!session) redirect("/admin/login");
  return session;
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!(await checkAdminCredentials(email, password))) {
    redirect("/admin/login?error=1");
  }
  const token = await createSessionToken(email);
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(COOKIE_NAME);
  redirect("/admin/login");
}

export async function updateLeadStatus(id: number, status: string) {
  await requireAdmin();
  await prisma.inquiry.update({
    where: { id },
    data: { status: status as never },
  });
  revalidatePath("/admin/leads");
}

type ProductInput = {
  categoryId: number;
  nameEn: string;
  localNameId?: string;
  latinName: string;
  slug: string;
  hsCode?: string;
  processingTypes: string;
  freezingMethods: string;
  sizeGrades: string;
  packagingSpec: string;
  moqSpec: string;
  availabilityStatus?: string;
  peakMonths?: string;
  descriptionEn: string;
  imageUrl: string;
  isFeatured?: boolean;
};

export async function createProduct(input: ProductInput) {
  await requireAdmin();
  await prisma.product.create({
    data: { ...input, availabilityStatus: (input.availabilityStatus ?? "AVAILABLE") as never },
  });
  revalidatePath("/admin/products");
  revalidatePath("/commodities");
}

export async function updateProduct(id: number, input: ProductInput) {
  await requireAdmin();
  await prisma.product.update({
    where: { id },
    data: { ...input, availabilityStatus: (input.availabilityStatus ?? "AVAILABLE") as never },
  });
  revalidatePath("/admin/products");
  revalidatePath("/commodities");
}

export async function deleteProduct(id: number) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/commodities");
}

export async function toggleFeatured(id: number, isFeatured: boolean) {
  await requireAdmin();
  await prisma.product.update({ where: { id }, data: { isFeatured } });
  revalidatePath("/admin/products");
  revalidatePath("/");
}
