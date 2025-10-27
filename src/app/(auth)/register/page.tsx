// app/register/page.tsx
import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account - Frank Educations",
  description:
    "Create your account to start your study abroad journey with Frank Educations",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
