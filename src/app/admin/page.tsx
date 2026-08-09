import type { Metadata } from "next";
import { AdminEditor } from "@/components/admin/AdminEditor";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPrices } from "@/lib/prices";
import { getSchedules } from "@/lib/schedules";
import { getStorageMode } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Sisällön hallinta",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  return (
    <div className="bg-[#eef1f4] pt-24 pb-8 md:pt-28">
      <div className="container-page max-w-[1100px]">
        {authed ? (
          <AdminEditor
            initialPrices={await getPrices()}
            initialSchedules={await getSchedules()}
            storageMode={getStorageMode()}
          />
        ) : (
          <div className="py-10">
            <AdminLogin />
          </div>
        )}
      </div>
    </div>
  );
}
