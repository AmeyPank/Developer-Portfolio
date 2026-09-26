import { SKILLS, PROJECTS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Terminal,
  Database,
  Layout,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/Github";
import ContactForm from "@/components/ContactForm"; // Correct default import

export default function Home() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 space-y-24">
      {/* Hero Section */}
      <section className="space-y-6 pt-12 md:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Available for new opportunities
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Backend & Full-Stack Engineer crafting scalable systems.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Specializing in TypeScript, Node.js, and relational architectures.
          Focused on building clean, high-performance APIs and rock-solid web
          applications.
        </p>
        <div className="flex gap-4 pt-2">
          <a href="#contact">
            <Button size="lg">Contact Me</Button>
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="outline" size="lg">
              <GithubIcon className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Technical Arsenal
          </h2>
          <p className="text-muted-foreground">
            Technologies and tools I work with daily.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Terminal className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-lg">Backend & Architecture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {SKILLS.backend.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Layout className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-lg">Frontend & UI</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {SKILLS.frontend.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Database className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="text-lg">DevOps & Database</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {SKILLS.devops_tools.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <p className="text-muted-foreground">
            Real-world applications showcasing scalable architecture.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <Card key={project.title} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="pt-2 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-4 border-t pt-4">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Button variant="ghost" size="sm">
                      <GithubIcon className="mr-2 h-4 w-4" /> Code
                    </Button>
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Button>
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      {/* Contact Section */}
      <section id="contact" className="space-y-8 pb-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Get in Touch</h2>
          <p className="text-muted-foreground">
            Have a role or project inquiry? Drop a message below.
          </p>
        </div>
        <Card className="max-w-lg mx-auto">
          <CardContent className="pt-6">
            <ContactForm />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
