"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./LandingPage.module.css";
import logo from "@/assets/logo.png"; // aligne avec ton arborescence

/**
 * LandingPage - Page d'accueil pour EPSI – La Soutenance
 * @param {Object} props
 * @param {Function} [props.onNavigate] - Callback navigation custom (optionnel)
 */
export default function LandingPage({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavClick = (mode) => {
    if (onNavigate) return onNavigate(mode);
    if (mode === "login") return router.push("/auth");
    if (mode === "signup") return router.push("/auth?mode=signup");
    if (mode === "play") return router.push("/app");    
  };

  return (
    <div className={styles.container}>
      <div className={styles.background} />

      {/* Navbar */}
      <nav className={styles.navbar} aria-label="Navigation principale">
        <div className={styles.navContent}>
          <div className={styles.navBrand}>
            <Image
              src={logo}
              alt="Logo EPSI – La Soutenance"
              className={styles.navLogo}
              priority
            />
          </div>

          {/* Desktop menu */}
          <div className={styles.navLinks}>
            <a href="#home" className={styles.navLink}>Accueil</a>
            <a href="#about" className={styles.navLink}>À propos</a>
          </div>

          <div className={styles.navAuth}>
            <button onClick={() => handleNavClick("login")} className={styles.navButton}>
              Se connecter
            </button>
            <button
              onClick={() => handleNavClick("signup")}
              className={`${styles.navButton} ${styles.navButtonPrimary}`}
            >
              S'inscrire
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Ouvrir le menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.hamburger} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className={styles.mobileMenu}>
            <a href="#home" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Accueil</a>
            <a href="#about" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>À propos</a>
            <button onClick={() => handleNavClick("login")} className={styles.mobileButton}>Se connecter</button>
            <button
              onClick={() => handleNavClick("signup")}
              className={`${styles.mobileButton} ${styles.mobileButtonPrimary}`}
            >
              S'inscrire
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroContent}>
          <Image
            src={logo}
            alt="Logo EPSI – La Soutenance"
            className={styles.heroLogo}
            priority
          />
          <p className={styles.heroSubtitle}>
            Deviens un dresseur d'arguments d'élite. Maîtrise l'art de la soutenance dans un univers RPG universitaire.
          </p>
          <button onClick={() => handleNavClick("login")} className={styles.heroButton}>
            <span className={styles.heroButtonIcon}>▶</span>
            Jouer
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="about" className={styles.features} aria-labelledby="features-title">
        <h2 id="features-title" className={styles.featuresTitle}>Caractéristiques du jeu</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎓</div>
            <h3 className={styles.featureTitle}>Campus Universitaire</h3>
            <p className={styles.featureDescription}>
              Explore un campus virtuel rempli de défis académiques et de soutenances épiques.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚔️</div>
            <h3 className={styles.featureTitle}>Combats d'Arguments</h3>
            <p className={styles.featureDescription}>
              Affronte d'autres étudiants dans des joutes oratoires stratégiques et tactiques.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3 className={styles.featureTitle}>Progression RPG</h3>
            <p className={styles.featureDescription}>
              Développe tes compétences, débloque de nouveaux arguments et monte en niveau.
            </p>
          </div>
        </div>
      </section>

      {/* How to Play */}
      <section className={styles.howToPlay} aria-labelledby="howto-title">
        <div className={styles.howToPlayContent}>
          <h2 id="howto-title" className={styles.howToPlayTitle}>Comment jouer ?</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>01</div>
              <h3 className={styles.stepTitle}>Crée ton personnage</h3>
              <p className={styles.stepDescription}>
                Inscris-toi et personnalise ton avatar d'étudiant. Choisis ta spécialité et tes compétences de départ.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>02</div>
              <h3 className={styles.stepTitle}>Explore le campus</h3>
              <p className={styles.stepDescription}>
                Découvre les différentes salles, rencontre d'autres joueurs et prépare-toi aux défis.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>03</div>
              <h3 className={styles.stepTitle}>Affronte le jury</h3>
              <p className={styles.stepDescription}>
                Participe à des soutenances, utilise tes arguments stratégiquement et monte en grade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer} aria-labelledby="footer-legal">
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Image src={logo} alt="Logo EPSI – La Soutenance" className={styles.footerLogo} />
            <p className={styles.footerTagline}>Dresse tes arguments, conquiers le jury.</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerSection}>
              <h4 id="footer-legal" className={styles.footerSectionTitle}>Légal</h4>
              <a href="#mentions" className={styles.footerLink}>Mentions légales</a>
              <a href="#privacy" className={styles.footerLink}>Politique de confidentialité</a>
              <a href="#terms" className={styles.footerLink}>Conditions d'utilisation</a>
            </div>
            <div className={styles.footerSection}>
              <h4 className={styles.footerSectionTitle}>Contact</h4>
              <a href="#support" className={styles.footerLink}>Support</a>
              <a href="#feedback" className={styles.footerLink}>Feedback</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>© 2025 EPSI - La Soutenance. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
