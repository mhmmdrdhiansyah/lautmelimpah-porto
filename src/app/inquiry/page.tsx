"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInquiryStore } from "@/lib/inquiry-store";
import { submitRfq } from "./actions";

type FieldErrors = Record<string, string>;

export default function InquiryPage() {
  const items = useInquiryStore((s) => s.items);
  const remove = useInquiryStore((s) => s.remove);
  const setQuantity = useInquiryStore((s) => s.setQuantity);
  const clear = useInquiryStore((s) => s.clear);

  const [form, setForm] = useState({
    buyerName: "",
    companyName: "",
    country: "",
    email: "",
    phoneWhatsapp: "",
    preferredIncoterm: "",
    shippingMode: "",
    destinationPort: "",
    additionalNotes: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [code, setCode] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function set(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    const result = await submitRfq({
      ...form,
      preferredIncoterm: form.preferredIncoterm || "FOB_JAKARTA",
      shippingMode: form.shippingMode || "SEA_REEFER",
      items: items.map((i) => ({
        productId: i.productId,
        requestedForm: i.requestedForm,
        requestedSize: i.requestedSize,
        estimatedQuantity: i.estimatedQuantity,
      })),
    });
    setBusy(false);
    if (result.ok) {
      setCode(result.code);
      clear();
      toast("Request received");
    } else {
      setErrors(result.fieldErrors as FieldErrors);
    }
  }

  const field = (
    name: string,
    label: string,
    node: React.ReactNode,
    optional = false,
  ) => (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name}>
        {label}
        {optional ? " (optional)" : ""}
      </Label>
      {node}
      {errors[name] && (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {errors[name]}
        </p>
      )}
    </div>
  );

  if (code) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">
          Request received.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Your reference: <span className="font-semibold">{code}</span>. We will
          reply with a quotation by email.
        </p>
        <Link href="/commodities" className="mt-6 inline-block underline underline-offset-4">
          Back to commodities
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-2">
      <section>
        <h1 className="font-display text-3xl font-semibold">Inquiry list</h1>
        {items.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Your inquiry list is empty.{" "}
            <Link href="/commodities" className="underline underline-offset-4">
              Browse commodities
            </Link>
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li
                key={item.productId}
                className="rounded-md border border-border p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{item.name}</p>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => remove(item.productId)}
                  >
                    ×
                  </button>
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor={`form-${item.productId}`}>Product form</Label>
                    <Input
                      id={`form-${item.productId}`}
                      defaultValue={item.requestedForm}
                      onChange={(e) => {
                        useInquiryStore.setState((s) => ({
                          items: s.items.map((it) =>
                            it.productId === item.productId
                              ? { ...it, requestedForm: e.target.value }
                              : it,
                          ),
                        }));
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor={`size-${item.productId}`}>Size</Label>
                    <Input
                      id={`size-${item.productId}`}
                      defaultValue={item.requestedSize}
                      onChange={(e) => {
                        useInquiryStore.setState((s) => ({
                          items: s.items.map((it) =>
                            it.productId === item.productId
                              ? { ...it, requestedSize: e.target.value }
                              : it,
                          ),
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <Label htmlFor={`qty-${item.productId}`}>
                    Estimated quantity (MT / kg / container)
                  </Label>
                  <Input
                    id={`qty-${item.productId}`}
                    value={item.estimatedQuantity}
                    onChange={(e) => setQuantity(item.productId, e.target.value)}
                  />
                  {errors.items && (
                    <p className="text-sm text-destructive">
                      {errors.items} — fill the quantity for every product.
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        {field("buyerName", "Buyer name", <Input id="buyerName" value={form.buyerName} onChange={set("buyerName")} />)}
        {field("companyName", "Company", <Input id="companyName" value={form.companyName} onChange={set("companyName")} />)}
        {field("country", "Country", <Input id="country" value={form.country} onChange={set("country")} />)}
        {field("email", "Email", <Input id="email" type="email" value={form.email} onChange={set("email")} />)}
        {field("phoneWhatsapp", "Phone / WhatsApp", <Input id="phoneWhatsapp" value={form.phoneWhatsapp} onChange={set("phoneWhatsapp")} />, true)}
        {field(
          "preferredIncoterm",
          "Incoterm",
          <Select value={form.preferredIncoterm} onValueChange={(v) => setForm((f) => ({ ...f, preferredIncoterm: v }))}>
            <SelectTrigger id="preferredIncoterm"><SelectValue placeholder="Select Incoterm" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="FOB_JAKARTA">FOB Jakarta</SelectItem>
              <SelectItem value="FOB_BELITUNG">FOB Belitung</SelectItem>
              <SelectItem value="CIF">CIF</SelectItem>
              <SelectItem value="CNF">CNF</SelectItem>
            </SelectContent>
          </Select>,
        )}
        {field(
          "shippingMode",
          "Shipping mode",
          <Select value={form.shippingMode} onValueChange={(v) => setForm((f) => ({ ...f, shippingMode: v }))}>
            <SelectTrigger id="shippingMode"><SelectValue placeholder="Select shipping mode" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="SEA_REEFER">Sea reefer</SelectItem>
              <SelectItem value="AIR_CARGO">Air cargo</SelectItem>
            </SelectContent>
          </Select>,
        )}
        {field("destinationPort", "Destination port", <Input id="destinationPort" value={form.destinationPort} onChange={set("destinationPort")} />, true)}
        {field("additionalNotes", "Notes", <Textarea id="additionalNotes" value={form.additionalNotes} onChange={set("additionalNotes")} />, true)}
        <Button type="submit" variant="accent" disabled={busy} className="mt-2">
          {busy ? "Sending…" : "Request a quotation"}
        </Button>
      </form>
    </div>
  );
}
