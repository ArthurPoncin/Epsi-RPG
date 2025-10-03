"use client";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pb";
import DebugPanel from "@/ui/DebugPanel";

export default function Game() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!pb.authStore.isValid) location.href = "/auth";
    else setReady(true);
  }, []);
  if (!ready) return null;
  return <main style={{ padding:20 }}><h1>EPSI – La Soutenance (MVP)</h1><DebugPanel/></main>;
}
