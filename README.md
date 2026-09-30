# Full-Stack Engineer Portfolio

A recruiter-focused portfolio with a public project showcase, a validated contact flow, and an authenticated admin area for creating, editing, featuring, and deleting project entries and reviewing contact inquiries.

## Stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS 4
- Prisma ORM and MySQL
- Zod for server-side input validation
- JWT admin sessions, `jose` middleware verification, and bcrypt password hashes
- Resend for optional email notifications

## Architecture

```text
src/
  app/                  Routes, layouts, metadata, server actions
    actions/            Thin request handlers for auth, contact, admin, projects
    admin/              Protected inbox and project management screens
  components/
    portfolio/          Public landing page sections and project presentation
    admin/              Admin-specific interactive forms
    ui/                 Reusable UI primitives
  features/
    contact/            Contact DTOs, validation, mapping, and persistence
    portfolio/          Curated profile, skill groups, and offline project defaults
    projects/            Project DTOs, schema, record mapper, service, repository
  lib/                   Shared auth, database, mail, and utility infrastructure
prisma/                  MySQL schema and admin seed script prisma error
```

Database projects are mapped into a view DTO. CineFlow remains visible as a curated featured project until a matching database entry is created, so adding another CMS project does not accidentally remove it from the public site. If the database is temporarily unavailable or has no entries, the site renders curated defaults. Admin pages and mutations verify the account against the database; middleware also protects admin routes.

## CineFlow Studio

CineFlow is presented as an AI-assisted video creation studio. Its project card lists the stack supplied for the project: Next.js 16, React 19, TypeScript, Google GenAI, Remotion, Inngest, PostgreSQL, Drizzle ORM, NextAuth, Zustand, and Swagger UI. The live app is [cine-flow-studio.vercel.app](https://cine-flow-studio.vercel.app/).

## Local setup

Use Node.js 20.9 or newer and a reachable MySQL database.

1. Install packages with `npm install`.
2. Copy `.env.example` to `.env` and set the values for your environment.
3. Apply the Prisma schema with `npx prisma db push`.
4. Create the admin account with `npx prisma db seed`.
5. Start the app with `npm run dev`.

The seed script creates the admin from `ADMIN_EMAIL` and `ADMIN_PASSWORD` (at least 8 characters) only when the account is missing. Re-running it preserves an existing admin password. It creates initial portfolio projects only when they are missing and preserves existing projects. It does not use or print a built-in default password. Set a unique random `JWT_SECRET` of at least 32 characters. Contact submissions are stored even when Resend is not configured; email alerts are optional.

## Environment variables

See `.env.example` for names and example formats. Keep actual credentials in environment-specific secret storage and out of version control.

## Useful scripts

- `npm run dev` — local development server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
- `npx prisma db push` — synchronize the Prisma schema to the configured database
- `npx prisma db seed` — create or update the admin account

## Deployment notes

- Configure `DATABASE_URL` and `JWT_SECRET` in the deployment environment before enabling the admin area.
- Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` for first-time admin creation. To change an existing admin password, update it through a dedicated password-reset flow rather than rerunning the seed.
- Configure `RESEND_API_KEY`, `NOTIFICATION_RECIPIENT_EMAIL`, and a verified `RESEND_FROM_EMAIL` to enable contact alerts.
- Database contents take precedence over curated fallback projects once project records exist. Manage public project content from `/admin/projects`.
