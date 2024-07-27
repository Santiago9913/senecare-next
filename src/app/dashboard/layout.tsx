import { getServerSession } from "next-auth";

import SenecareDrawer from "./components/drawer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <div className="flex flex-row max-h-dvh overflow-hidden">
      <SenecareDrawer profileName={session?.user?.name ?? "Dr"} role="Admin" />
      <div className="grow pl-4 bg-gray-50 overflow-auto">
        <div className="min-h-dvh bg-white pt-4 pl-4 pr-4 ">{children}</div>
      </div>
    </div>
  );
}
