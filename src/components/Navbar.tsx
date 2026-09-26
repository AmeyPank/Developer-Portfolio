import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-bold tracking-tight text-lg">
          Portfolio<span className="text-primary">.dev</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="#about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="#skills"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Skills
          </Link>
          <Link
            href="#projects"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Projects
          </Link>
          <Link href="#contact">
            <Button size="sm">Get in Touch</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
