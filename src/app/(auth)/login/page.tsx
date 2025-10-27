import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login - Frank Educations",
  description: "Login to your Frank Educations account",
};

export default function LoginPage() {
  return <LoginForm />;
}
