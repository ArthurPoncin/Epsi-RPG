// app/layout.js
import "./globals.css";

export const metadata = { title: "EPSI – La Soutenance (MVP)" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning className="app-body">
        {children}
      </body>
    </html>
  );
}
