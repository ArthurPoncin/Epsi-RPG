"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { pb } from "@/lib/pb";
import AuthScreen from "@/ui/auth/AuthScreen";

export default function AuthPage() {
  const router = useRouter();
  const search = useSearchParams();
  const initialMode = search.get("mode") === "signup" ? "signup" : "login";
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pb.authStore.isValid) {
      router.replace("/game");
      return;
    }
    const unsub = pb.authStore.onChange(() => {
      if (pb.authStore.isValid) router.replace("/game");
    });
    setChecking(false);
    return () => unsub?.();
  }, [router]);

  const onAuthenticated = () => router.replace("/game");
  if (checking) return null;

  return <AuthScreen onAuthenticated={onAuthenticated} initialMode={initialMode} />;
}
