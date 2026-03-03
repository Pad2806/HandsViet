# HandsVietReha - Hệ Thống Đặt Lịch Phục Hồi Chức Năng

Hệ thống đặt lịch phục hồi chức năng, lấy cảm hứng từ booking flow của ReetroBarberShop.

## 🚀 Features

### Patient Features

- 📱 Tra cứu thông tin bằng số điện thoại
- 📅 Đặt lịch khám và trị liệu phục hồi chức năng
- 👨‍💼 Chọn chuyên viên vật lý trị liệu (Therapist)
- 💳 Đặt cọc qua VietQR (tự động xác nhận qua Sepay)
- 📝 Xem lịch sử khám và hồ sơ điều trị (các bài tập, tiến triển)
- 🤖 Tương tác với AI Chatbot (Gemini) để nhận tư vấn sức khỏe

### Clinic Owner Features

- 🏪 Quản lý thông tin phòng khám
- 💇 Quản lý dịch vụ và bảng giá
- 👥 Quản lý chuyên viên và lịch làm việc
- 📊 Quản lý hồ sơ bệnh án (Treatment Records)
- 💰 Theo dõi thanh toán và doanh thu
- 📈 Dashboard thống kê

### Admin Features

- 👑 Quản lý hệ thống phòng khám
- 📊 Thống kê toàn hệ thống
- 🔧 Cấu hình hệ thống

## 🛠️ Tech Stack

- **Monorepo**: Turborepo + pnpm
- **Frontend**: Next.js 15 (App Router)
- **Backend**: NestJS 11
- **Database**: PostgreSQL 16 (Neon) + Prisma 6
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **AI Chatbot**: Google Gemini Pro
- **Payment**: VietQR + Sepay Webhook
- **State**: Zustand + TanStack Query v5

## 📁 Project Structure

```
handsviet-reha/
├── apps/
│   ├── api/          # NestJS Backend API
│   ├── web/          # Next.js Web App
│   └── zalo/         # Zalo Mini App
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
