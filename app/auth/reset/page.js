"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { pb } from "@/lib/pb";

export default function ResetPasswordPage() {
  const search = useSearchParams();
  const token = search.get("token") || "";
  const router = useRouter();
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (p1 !== p2) return setMsg("Les mots de passe ne correspondent pas.");
    try {
      await pb.collection("users").confirmPasswordReset(token, p1, p2);
      setMsg("Mot de passe réinitialisé. Tu peux te connecter.");
      setTimeout(() => router.replace("/auth"), 1200);
    } catch (err) {
      setMsg(err?.message || "Lien invalide ou expiré.");
    }
  };

  return (
    <main style={{ padding: 32, maxWidth: 420 }}>
      <h1>Réinitialiser le mot de passe</h1>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input type="password" placeholder="Nouveau mot de passe" value={p1} onChange={e=>setP1(e.target.value)} required />
        <input type="password" placeholder="Confirmer" value={p2} onChange={e=>setP2(e.target.value)} required />
        <button type="submit">Valider</button>
      </form>
      <p>{msg}</p>
    </main>
  );
}
