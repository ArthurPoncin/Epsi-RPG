"use client";
import { useState } from "react";
import { pb } from "@/lib/pb";
import Link from "next/link";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(""); setMsg(""); setLoading(true);
    try {
      await pb.collection("users").requestPasswordReset(email);
      setMsg("Email envoyé. Consulte ta boîte mail pour réinitialiser ton mot de passe.");
    } catch (e) {
      setErr(e?.message || "Impossible d’envoyer l’email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 32, maxWidth: 420 }}>
      <h1>Mot de passe oublié</h1>
      <p style={{opacity:.8}}>Entre ton email, on t’envoie un lien de réinitialisation.</p>
      <form onSubmit={submit} style={{ display:"grid", gap:12 }}>
        <input
          type="email" placeholder="ton@email"
          value={email} onChange={(e)=>setEmail(e.target.value)}
          required disabled={loading}
        />
        <button type="submit" disabled={loading || !email}>Envoyer le lien</button>
      </form>
      {msg && <p style={{ color:"#2ecc71" }}>{msg}</p>}
      {err && <p style={{ color:"#e74c3c" }}>{err}</p>}
      <p style={{marginTop:12}}><Link href="/auth">← Retour à la connexion</Link></p>
    </main>
  );
}
