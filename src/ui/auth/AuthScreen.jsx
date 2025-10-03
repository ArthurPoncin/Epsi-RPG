"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./AuthScreen.module.css";
import { pb } from "@/lib/pb";
import Image from "next/image";
import logoSrc from "@/assets/logo.png";

export default function AuthScreen({
  onAuthenticated,
  className,
  initialMode = "login",
}) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailInputRef = useRef(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, [mode]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setError("");
    setSuccess("");
  };
  const handleModeChange = (m) => {
    setMode(m);
    resetForm();
  };

  const validateForm = () => {
    if (!email.trim()) return (setError("Email requis."), false);
    if (!password) return (setError("Mot de passe requis."), false);
    if (mode === "signup" && password !== passwordConfirm)
      return (setError("Mots de passe différents."), false);
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      onAuthenticated?.(authData);
    } catch (err) {
      setError(err?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    try {
      await pb
        .collection("users")
        .create({ email, password, passwordConfirm: password });
      setSuccess("Compte créé. Tu peux te connecter.");
      setMode("login");
      setPassword("");
      setPasswordConfirm("");
    } catch (err) {
      setError(err?.message || "Erreur de création");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "login" ? handleLogin() : handleSignup();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) handleSubmit(e);
  };
  const resetPassword = async () => {
    if (!email) return setError("Entre ton email pour réinitialiser.");
    try {
      await pb.collection("users").requestPasswordReset(email);
      setSuccess("Email de réinitialisation envoyé.");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.background} />
      <div className={styles.card}>
        <div className={styles.header}>
          <Image src={logoSrc} alt="La Soutenance" className={styles.logo} />
          <p className={styles.subtitle}>
            Centre d'admission des dresseurs d'arguments
          </p>
        </div>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${mode === "login" ? styles.tabActive : ""}`}
            onClick={() => handleModeChange("login")}
            disabled={loading}
          >
            Connexion
          </button>
          <button
            type="button"
            className={`${styles.tab} ${mode === "signup" ? styles.tabActive : ""}`}
            onClick={() => handleModeChange("signup")}
            disabled={loading}
          >
            Création
          </button>
        </div>

        {error && (
          <div className={styles.errorBanner} role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className={styles.successBanner} role="status">
            {success}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.helpText}>
            {mode === "login"
              ? "Reprendre ta sauvegarde ?"
              : "Créer ton compte dresseur·se d'arguments."}
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              <span className={styles.icon}>📧</span>Email
            </label>
            <input
              ref={emailInputRef}
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              <span className={styles.icon}>🔒</span>Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              required
            />
          </div>

          {mode === "signup" && (
            <div className={styles.field}>
              <label htmlFor="passwordConfirm" className={styles.label}>
                <span className={styles.icon}>🔒</span>Confirmer le mot de passe
              </label>
              <input
                id="passwordConfirm"
                type="password"
                className={styles.input}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                required
              />
            </div>
          )}

          {mode === "login" && (
            <div className={styles.forgotPassword}>
              <a href="#" className={styles.link}>
                Mot de passe oublié ?
              </a>
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <>
                {" "}
                <span className={styles.spinner} /> Préparation de la
                soutenance…{" "}
              </>
            ) : mode === "login" ? (
              "Entrer dans le campus"
            ) : (
              "Obtenir sa carte d'étudiant·e"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
