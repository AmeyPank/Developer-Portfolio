import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Full-Stack Engineer | Portfolio",
    template: "%s | Full-Stack Engineer",
  },
  description:
    "Portfolio of a backend-minded full-stack engineer building dependable systems, thoughtful APIs, and useful web products.",
  openGraph: {
    title: "Full-Stack Engineer | Portfolio",
    description:
      "Selected work in backend engineering, full-stack product development, and reliable web systems.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-cyan-300 selection:text-slate-950">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
