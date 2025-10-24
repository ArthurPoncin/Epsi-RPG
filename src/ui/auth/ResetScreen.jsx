"use client";
import { useState, useMemo } from "react";
import { pb } from "@/lib/pb";
import Link from "next/link";
import styles from "./ResetScreen.module.css";
import Image from "next/image";
import logoSrc from "@/assets/logo.png";

export default function ResetScreen({ token = "", onSuccess }) {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => {
    if (!token) return true;
    if (!p1 || !p2) return true;
    return loading;
  }, [token, p1, p2, loading]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    if (!token) return setErr("Lien invalide ou manquant. Redemande un email de réinitialisation.");
    if (p1 !== p2) return setErr("Les mots de passe ne correspondent pas.");

    try {
      setLoading(true);
      await pb.collection("users").confirmPasswordReset(token, p1, p2);
      setMsg("Mot de passe réinitialisé. Tu peux te connecter.");
      onSuccess?.();
    } catch (e) {
      setErr(e?.message || "Lien invalide ou expiré.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <section className={styles.card} aria-labelledby="reset-title">
        <header className={styles.header}>
          <Image src={logoSrc} alt="La Soutenance" className={styles.logo} />
          <p id="reset-title" className={styles.subtitle}>Réinitialiser le mot de passe</p>
        </header>

        {err && <div className={styles.errorBanner}>{err}</div>}
        {msg && <div className={styles.successBanner}>{msg}</div>}

        {!token && (
          <p className={styles.helpText}>
            Le lien semble incomplet. Retourne à&nbsp;
            <Link className={styles.link} href="/auth/forgot">“Mot de passe oublié”</Link>
            &nbsp;pour recevoir un nouveau lien.
          </p>
        )}

        <form onSubmit={submit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>
              <span className={styles.icon}>🔒</span> Nouveau mot de passe
            </label>
            <input
              className={styles.input}
              type="password"
              placeholder="Nouveau mot de passe"
              value={p1}
              onChange={(e) => setP1(e.target.value)}
              required
              minLength={8}
              disabled={loading || !token}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <span className={styles.icon}>🔁</span> Confirmer le mot de passe
            </label>
            <input
              className={styles.input}
              type="password"
              placeholder="Confirmer"
              value={p2}
              onChange={(e) => setP2(e.target.value)}
              required
              minLength={8}
              disabled={loading || !token}
            />
          </div>

          <button className={styles.submitButton} type="submit" disabled={disabled}>
            {loading ? <span className={styles.spinner} /> : "Valider"}
          </button>
        </form>

        <p className={styles.helpText} style={{ marginTop: "0.75rem" }}>
          <Link href="/auth" className={styles.link}>← Retour à la connexion</Link>
        </p>
      </section>
    </div>
  );
}
