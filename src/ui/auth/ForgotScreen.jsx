"use client";
import { useState } from "react";
import { pb } from "@/lib/pb";
import { useRouter } from "next/navigation";
import styles from "./ForgotScreen.module.css";
import Image from "next/image";
import logoSrc from "@/assets/logo.png";

export default function ForgotScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    //  validation côté client (format)
    const basicEmailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailRE.test(email)) {
      setErr("Format d’email invalide.");
      return;
    }

    try {
      setLoading(true);

      // Vérifier que l’email existe côté serveur
      const res = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.ok) {
        throw new Error(data.error || "Vérification impossible pour le moment.");
      }
      if (!data.exists) {
        throw new Error("Aucun compte avec cet email.");
      }

      // Déclencher l’email de réinitialisation PocketBase
      await pb.collection("users").requestPasswordReset(email);
      setMsg(
        "Email envoyé. Consulte ta boîte mail pour réinitialiser ton mot de passe."
      );
    } catch (e) {
      setErr(e?.message || "Impossible d’envoyer l’email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <section className={styles.card} aria-labelledby="forgot-title">
        <header className={styles.header}>
          <Image src={logoSrc} alt="La Soutenance" className={styles.logo} />
          <p id="forgot-title" className={styles.subtitle}>
            Mot de passe oublié
          </p>
        </header>

        {err && <div className={styles.errorBanner}>{err}</div>}
        {msg && <div className={styles.successBanner}>{msg}</div>}

        <p className={styles.helpText}>
          Entre ton email, on t’envoie un lien de réinitialisation.
        </p>

        <form onSubmit={submit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>
              <span className={styles.icon}>📧</span> Adresse email
            </label>
            <input
              className={styles.input}
              type="email"
              placeholder="ton@email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoFocus
            />
          </div>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={loading || !email}
            aria-disabled={loading || !email}
          >
            {loading ? <span className={styles.spinner} /> : "Envoyer le lien"}
          </button>
        </form>

<p className={styles.helpText} style={{ marginTop: "0.75rem" }}>
  <a
    href="/auth"
    className={styles.link}
    onClick={(e) => {
      e.preventDefault();
      if (window.history.length > 1) {
        router.back();
      } else {
        router.replace("/auth");
      }
    }}
  >
    ← Retour à la page précédente
  </a>
</p>

      </section>
    </div>
  );
}
