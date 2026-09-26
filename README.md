# Full-Stack Developer Portfolio & CMS

A high-performance personal portfolio and content management system built with Next.js (App Router), TypeScript, Tailwind CSS, Prisma, and MySQL. It features a public-facing showcase and an authenticated administrative dashboard for managing projects and reviewing client inquiries in real time.

---

## 🌐 Live Demo & Repository

- **Live URL**: [https://your-domain.vercel.app](https://your-domain.vercel.app)
- **GitHub Repository**: [https://github.com/your-username/portfolio](https://github.com/your-username/portfolio)

---

## 🚀 Tech Stack

### Core Framework & Language
- **Framework**: [Next.js](https://nextjs.org/) (App Router & React Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety across client and server)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Radix-based UI component primitives

### Backend, Database & ORM
- **Database**: MySQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Server Actions**: Native Next.js Server Actions with React 19 `useActionState`

### Authentication & Security
- **Auth**: JWT-based session tokens with `jose` and `bcryptjs`
- **Route Protection**: Next.js Edge Middleware guarding `/admin` routes
- **Anti-Spam & Bot Protection**:
  - Hidden CSS Honeypot strategy to catch automated scrapers
  - Disposable email domain filtering via Zod schemas

### Notifications & Email Delivery
- **Email Service**: [Resend](https://resend.com/) for automated transactional notifications on new contact submissions

---

## 📂 Architecture & Folder Structure

```text
portfolio/
├── prisma/
│   ├── schema.prisma              # Data models (User, ContactMessage, Project)
│   └── seed.ts                    # Admin credential seeding script
│
├── public/                        # Static assets (images, resumes, icons)
│   ├── avatar.png
│   └── resume.pdf
│
├── src/
│   ├── middleware.ts              # Edge route protection for /admin routes
│   │
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css            # Tailwind & theme variables
│   │   ├── layout.tsx             # Root layout & theme providers
│   │   ├── page.tsx               # Public landing page (Hero, Projects, Contact)
│   │   │
│   │   ├── actions/               # Server Actions ("use server")
│   │   │   ├── admin.ts           # Message status mutations & deletion
│   │   │   ├── auth.ts            # Admin authentication & session cookies
│   │   │   ├── contact.ts         # Contact form validation & email triggers
│   │   │   └── projects.ts        # Project CRUD actions (create, delete, feature)
│   │   │
│   │   ├── admin/                 # Protected Admin Area
│   │   │   ├── page.tsx           # /admin (Messages inbox & stats)
│   │   │   └── projects/
│   │   │       └── page.tsx       # /admin/projects (Dynamic project management)
│   │   │
│   │   └── login/
│   │       └── page.tsx           # /login (Admin sign-in portal)
│   │
│   ├── components/                # Reusable React UI components
│   │   ├── ContactForm.tsx        # Client contact form with honeypot & Zod errors
│   │   ├── Navbar.tsx             # Responsive header navigation
│   │   │
│   │   ├── admin/                 # Admin-only UI components
│   │   │   └── ProjectForm.tsx    # Project creation & edit interface
│   │   │
│   │   ├── icons/                 # Custom SVG icons
│   │   │
│   │   └── ui/                    # Base UI buttons, cards, and inputs
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   │
│   └── lib/                       # Singletons & helpers
│       ├── auth.ts                # JWT and password encryption helpers
│       ├── mail.ts                # Resend client instance
│       ├── prisma.ts              # Global Prisma Client singleton
│       └── utils.ts               # Tailwind class merger (cn)
│
├── .env                           # Environment variables (Ignored in Git)
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🗄️ Database Schema (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Hashed with bcrypt
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ContactMessage {
  id        String   @id @default(uuid())
  name      String
  email     String
  message   String   @db.Text
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}

model Project {
  id          String   @id @default(uuid())
  title       String
  description String   @db.Text
  tags        String   // Comma-separated: "Next.js,TypeScript,MySQL"
  githubUrl   String?
  liveUrl     String?
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 🔑 Key Features Implemented

1. **Dynamic Project Management (CMS)**:
   - Full CRUD operations to add, delete, and feature showcase projects.
   - Display priority ordering and tag filtering directly backed by MySQL.
2. **Interactive Contact Form with Anti-Bot Architecture**:
   - Zero-friction honeypot fields that intercept automated web scrapers silently.
   - Server-side field validation using Zod.
   - Instant email alerts via Resend when new messages arrive.
3. **Protected Admin Dashboard**:
   - Secure edge middleware preventing unauthorized access to administrative controls.
   - Unread badge counters, instant status toggles, and deletion workflows.
4. **Optimized Development & Server Performance**:
   - Server Components for direct database reads without client-side waterfalls.
   - Automated path revalidation (`revalidatePath`) for instant cache updates upon editing.

---

## 🛠️ Complete Local Setup & Run Guide

Follow these steps to get this project running on any machine (Windows, macOS, or Linux).

### 📋 Prerequisites

Make sure the following are installed:
1. **Node.js**: Version `18.17.0` or higher (`20.x` LTS recommended) — check via:
   ```bash
   node -v
   ```
2. **Git**: Installed and accessible in terminal — check via:
   ```bash
   git --version
   ```
3. **MySQL Server**: Running on port `3306` (Local service, XAMPP, or Docker)

---

### Step 1: Clone the Repository

```bash
git clone [https://github.com/your-username/portfolio.git](https://github.com/your-username/portfolio.git)
cd portfolio
```

---

### Step 2: Install Node Dependencies

```bash
npm install
```

---

### Step 3: Configure Environment Variables

Create a file named `.env` in the root folder:

```env
# ==========================================
# 1. DATABASE (MySQL)
# ==========================================
# Format: mysql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE_NAME>
DATABASE_URL="mysql://root:yourpassword@localhost:3306/portfolio_db"

# ==========================================
# 2. AUTHENTICATION & SECURITY
# ==========================================
# Secure random key for signing admin JWT session tokens (at least 32 characters)
JWT_SECRET="super-secret-random-jwt-key-min-32-chars-long"

# ==========================================
# 3. RESEND EMAIL API
# ==========================================
# API key from [https://resend.com](https://resend.com)
RESEND_API_KEY="re_123456789abcdef"

# Email address where contact form notifications will be received
ADMIN_EMAIL="your-email@example.com"
```

> **Database Preparation**:
> If the database does not exist yet, create it in MySQL before running migrations:
> ```sql
> CREATE DATABASE portfolio_db;
> ```

---

### Step 4: Database Setup & Seeding

Sync the schema with MySQL, generate the Prisma Client, and seed the admin user:

```bash
# 1. Push database models to MySQL
npx prisma db push

# 2. Generate Prisma Client bindings
npx prisma generate

# 3. Seed default admin credentials
npx ts-node prisma/seed.ts
```

*(Tip: Run `npx prisma studio` anytime to view and edit database tables in your browser at `http://localhost:5555`)*.

---

### Step 5: Start Development Server

```bash
npm run dev
```

The application is now accessible at:
- **Public Portfolio**: [http://localhost:3000](http://localhost:3000)
- **Admin Sign-In**: [http://localhost:3000/login](http://localhost:3000/login)
- **Project CMS**: [http://localhost:3000/admin/projects](http://localhost:3000/admin/projects)

---

## 🔍 Default Admin Credentials

If you ran `prisma/seed.ts`, log in at `/login` with:
- **Email**: Defined in `prisma/seed.ts` (e.g., `admin@portfolio.com`)
- **Password**: Defined in your seed configuration

---

## ⚠️ Common Troubleshooting

### 1. `EPERM: operation not permitted ... query_engine-windows.dll.node` (Windows)
- **Cause**: Prisma query engine binary is locked in memory by an active Node.js server.
- **Fix**:
  1. Stop your terminal server (`Ctrl + C`).
  2. Kill lingering Node processes in PowerShell:
     ```powershell
     Stop-Process -Name node -Force
     ```
  3. Remove the stale client folder:
     ```powershell
     Remove-Item -Recurse -Force "node_modules\.prisma"
     ```
  4. Regenerate Prisma Client:
     ```powershell
     npx prisma generate
     ```

### 2. `P1001: Can't reach database server`
- **Cause**: MySQL server is offline or port `3306` is not accessible.
- **Fix**: Check that your local MySQL service is running and verify `DATABASE_URL` credentials in `.env`.

### 3. Contact Form Emails Not Sending
- If `RESEND_API_KEY` is omitted or invalid during local testing, contact messages are still saved safely in the MySQL database (`ContactMessage`), but email delivery will be skipped. Provide a valid key from [resend.com](https://resend.com) to enable email delivery.

---

## 📦 Useful NPM Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Launch local Next.js development server with hot-reload |
| `npx prisma studio` | Open the interactive database GUI at `localhost:5555` |
| `npx prisma db push` | Push `schema.prisma` updates directly to MySQL |
| `npx prisma generate` | Re-generate Prisma Client TypeScript types |
| `npm run build` | Compile and validate production build |
| `npm run start` | Launch compiled production build locally |

---

## 🗺️ Project Roadmap & Ongoing Enhancements

- [x] Phase 1: Core setup, Next.js App Router, Tailwind configuration
- [x] Phase 2: MySQL schema design, Prisma ORM, and Resend email integration
- [x] Phase 3: JWT Admin authentication with Middleware route protection
- [x] Phase 4: Dynamic Project CMS and form spam prevention
- [ ] **Phase 5 (Next)**: Dynamic Landing Page integration (fetching projects directly from MySQL into `src/app/page.tsx`)
- [ ] **Phase 6**: SEO optimization, dynamic Open Graph cards, sitemap generation, and production deployment on Vercel