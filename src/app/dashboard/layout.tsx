import SenecareDrawer from "./components/drawer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <SenecareDrawer profileName="Santiago Fajardo" role="Admin" />
      <div className="grow p-4 bg-gray-100">{children}</div>
    </div>
  );
}
