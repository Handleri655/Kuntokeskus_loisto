import type { Metadata } from "next";
import { AdminEditor } from "@/components/admin/AdminEditor";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPrices } from "@/lib/prices";
import { getStorageMode } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Sisällön hallinta",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  return (
    <div className="bg-paper pt-20 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pt-28 md:pb-10">
      <div className="container-page max-w-[1120px]">
        {authed ? (
          <AdminEditor
            initialPrices={await getPrices()}
            storageMode={getStorageMode()}
          />
        ) : (
          <div className="py-8 md:py-10">
            <AdminLogin />
          </div>
        )}
      </div>
    </div>
  );
}
