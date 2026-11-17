import Link from "next/link";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;
  const email = session?.email ?? "";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Admin</h1>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/admin" className="hover:underline">Dashboard</Link>
          <Link href="/admin/products" className="hover:underline">Products</Link>
          <Link href="/admin/leads" className="hover:underline">Leads</Link>
          {email && (
            <form action={logout}>
              <button type="submit" className="text-muted-foreground hover:underline">
                Sign out ({email})
              </button>
            </form>
          )}
        </nav>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
