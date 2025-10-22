// export default function DashboardLayout({ children }) {
//   return (
//     <div className="dashboard-layout">
//       <main className="dashboard-content">{children}</main>
//     </div>
//   );
// }
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: "2rem", background: "#f5f5f5", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "2rem", color: "#1a365d" }}>Dashboard</h1>
      {children}
    </div>
  );
}
