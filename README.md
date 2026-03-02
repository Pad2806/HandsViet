# ReetroBarberShop - Booking System

A modern barber shop booking system inspired by 30shine.com, built with a focus on mobile-first design and Zalo Mini App integration.

## 🚀 Features

### Customer Features

- 📱 Browse salons and services
- 📅 Book appointments with preferred time slots
- 👨‍💼 Choose preferred staff/stylist
- 💳 Pay via VietQR (auto-confirmation via Sepay)
- ⭐ Review and rate services
- 🔔 Receive booking notifications

### Salon Owner Features

- 🏪 Manage salon information
- 💇 Manage services and pricing
- 👥 Manage staff and schedules
- 📊 View booking calendar
- 💰 Track payments and revenue
- 📈 View analytics dashboard

### Admin Features

- 👑 Manage all salons and users
- 📊 System-wide analytics
- 🔧 Platform configuration

## 🛠️ Tech Stack

- **Monorepo**: Turborepo + pnpm
- **Frontend**: Next.js 14 (App Router)
- **Backend**: NestJS 10
- **Database**: PostgreSQL 16 + Prisma
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Passport.js (Google, Facebook, Local, Zalo)
- **Payment**: VietQR + Sepay Webhook
- **Zalo Mini App**: Native Zalo Framework

## 📁 Project Structure

```
reetro-booking/
├── apps/
│   ├── api/          # NestJS Backend API
│   ├── web/          # Next.js Web App (coming soon)
│   └── zalo/         # Zalo Mini App (coming soon)
├── packages/
│   ├── shared/       # Shared types, constants, utilities
│   └── brand/        # White-label branding configuration
├── docs/             # Documentation
└── docker-compose.yml
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose
- PostgreSQL 16 (or use Docker)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd Booking_Barber
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Setup environment**

   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Start Docker services** (PostgreSQL + Redis)

   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**

   ```bash
   cd apps/api
   pnpm prisma migrate dev
   pnpm prisma generate
   ```

6. **Seed database** (optional)

   ```bash
   pnpm prisma db seed
   ```

7. **Start development servers**
   ```bash
   # From root directory
   pnpm dev
   ```

### Available Commands

```bash
# Development
pnpm dev              # Start all apps in development mode
pnpm dev:api          # Start API only
pnpm dev:web          # Start Web only

# Build
pnpm build            # Build all apps
pnpm build:api        # Build API only
pnpm build:web        # Build Web only

# Database
cd apps/api
pnpm prisma migrate dev    # Run migrations
pnpm prisma studio         # Open Prisma Studio

# Linting & Formatting
pnpm lint             # Lint all packages
pnpm format           # Format all files

# Testing
pnpm test             # Run tests
```

## 📖 API Documentation

When running in development, Swagger documentation is available at:

- http://localhost:3001/docs

## 🔐 Authentication

### Web/Mobile

- Email/Password
- Google OAuth
- Facebook OAuth

### Zalo Mini App

- Zalo OAuth (native SDK integration)

## 💳 Payment Integration

### VietQR

The system generates VietQR codes for bank transfers. Customers scan the QR code with their banking app to make payments.

### Sepay Webhook

When a bank transfer is received, Sepay sends a webhook notification to automatically confirm the payment.

**Webhook URL**: `POST /api/v1/payments/webhook/sepay`

## 🏗️ White-Label Architecture

The system is designed as white-label, allowing easy re-branding:

1. Edit `packages/brand/src/config.ts` to change:
   - Brand name, logo, colors
   - Contact information
   - Social media links
   - Default payment settings

2. Rebuild and deploy

## 📱 Zalo Mini App

The Zalo Mini App is the primary customer-facing platform. See `apps/zalo/README.md` for setup instructions.

## 🐳 Docker Deployment

### Development

```bash
docker-compose up -d
```

### Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📄 License

Private - All rights reserved

---

Built with ❤️ by Pad
