// /src/app/(auth)/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frank Educations - Account",
  description: "Login or create your Frank Educations account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      {/* Możesz dodać wspólny header/nav dla stron auth */}
      <div className="auth-container">{children}</div>

      <style jsx>{`
        .auth-layout {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .auth-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
}
