import { redirect } from "next/navigation";
import ResetScreen from "@/ui/auth/ResetScreen";

export default function ResetPasswordPage({ searchParams }) {
  const token = typeof searchParams?.token === "string" ? searchParams.token : "";

  if (!token) {    
    redirect("/auth");
  }

  return <ResetScreen token={token} onSuccess={() => { /* handled inside ResetScreen via router */ }} />;
}

// SEO: pas d'indexation
export const metadata = {
  robots: { index: false, follow: false },
};
