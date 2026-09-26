import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack & Backend Engineer",
  description: "Personal developer portfolio and projects showcase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        <main>{children}</main>
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-3 right-3 z-50 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-500 border border-amber-500/40">
            ENV: {process.env.NODE_ENV.toUpperCase()}
          </div>
        )}
      </body>
    </html>
  );
}
