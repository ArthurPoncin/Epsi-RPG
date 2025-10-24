"use client";
import { useSearchParams, useRouter } from "next/navigation";
import ResetScreen from "@/ui/auth/ResetScreen";

export default function ResetPasswordPage() {
  const search = useSearchParams();
  const token = search.get("token") || "";
  const router = useRouter();

  return (
    <ResetScreen
      token={token}
      onSuccess={() => {
        setTimeout(() => router.replace("/auth"), 1200);
      }}
    />
  );
}
