"use client";

import { useState } from "react";
import { Category, Product } from "@prisma/client";
import { createProduct, updateProduct } from "../actions";

type Props = {
  categories: Category[];
  product?: Product;
};

export function ProductForm({ categories, product }: Props) {
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const input = {
      categoryId: Number(fd.get("categoryId")),
      nameEn: String(fd.get("nameEn")),
      localNameId: String(fd.get("localNameId") || "") || undefined,
      latinName: String(fd.get("latinName")),
      slug: String(fd.get("slug")),
      hsCode: String(fd.get("hsCode") || "") || undefined,
      processingTypes: String(fd.get("processingTypes")),
      freezingMethods: String(fd.get("freezingMethods")),
      sizeGrades: String(fd.get("sizeGrades")),
      packagingSpec: String(fd.get("packagingSpec")),
      moqSpec: String(fd.get("moqSpec")),
      availabilityStatus: String(fd.get("availabilityStatus")),
      peakMonths: String(fd.get("peakMonths") || "") || undefined,
      descriptionEn: String(fd.get("descriptionEn")),
      imageUrl: String(fd.get("imageUrl")),
      isFeatured: fd.get("isFeatured") === "on",
    };
    if (product) {
      await updateProduct(product.id, input);
    } else {
      await createProduct(input);
    }
    setBusy(false);
  }

  const field = (name: string, label: string, def?: string | number, required = true) => (
    <label className="flex flex-col gap-1 text-sm">
      {label}
      <input
        name={name}
        defaultValue={def}
        required={required}
        className="rounded-sm border border-input px-3 py-2"
      />
    </label>
  );

  return (
    <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
      {field("nameEn", "Name (EN)", product?.nameEn)}
      {field("localNameId", "Local name (ID)", product?.localNameId ?? "", false)}
      {field("latinName", "Latin name", product?.latinName)}
      {field("slug", "Slug", product?.slug)}
      {field("hsCode", "HS code", product?.hsCode ?? "", false)}
      <label className="flex flex-col gap-1 text-sm">
        Category
        <select
          name="categoryId"
          defaultValue={product?.categoryId ?? categories[0]?.id}
          className="rounded-sm border border-input px-3 py-2"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nameEn}
            </option>
          ))}
        </select>
      </label>
      {field("processingTypes", "Product forms", product?.processingTypes)}
      {field("freezingMethods", "Freezing methods", product?.freezingMethods)}
      {field("sizeGrades", "Size / grading", product?.sizeGrades)}
      {field("packagingSpec", "Packaging", product?.packagingSpec)}
      {field("moqSpec", "MOQ", product?.moqSpec)}
      <label className="flex flex-col gap-1 text-sm">
        Availability
        <select
          name="availabilityStatus"
          defaultValue={product?.availabilityStatus ?? "AVAILABLE"}
          className="rounded-sm border border-input px-3 py-2"
        >
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="SEASONAL">SEASONAL</option>
          <option value="LIMITED">LIMITED</option>
        </select>
      </label>
      {field("peakMonths", "Peak months", product?.peakMonths ?? "", false)}
      {field("imageUrl", "Image URL", product?.imageUrl)}
      <label className="flex flex-col gap-1 text-sm md:col-span-2">
        Description (EN)
        <textarea
          name="descriptionEn"
          defaultValue={product?.descriptionEn}
          required
          className="rounded-sm border border-input px-3 py-2"
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isFeatured" defaultChecked={product?.isFeatured} />
        Featured on home
      </label>
      <button
        type="submit"
        disabled={busy}
        className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-50 md:col-span-2"
      >
        {busy ? "Saving…" : product ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}
