export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar /> {/* BOCZNA NAWIGACJA */}
      <main className="dashboard-content">{children}</main>
    </div>
  );
}
