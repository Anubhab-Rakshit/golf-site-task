# ParSide 🏌️‍♂️💎

![ParSide Logo](public/logo.png)

> **TECHNICAL LUXURY GOLF CHARITY SUBSCRIPTION PLATFORM**
>
> A web application designed for high-performance golf tracking, charitable giving, and monthly prize draws. Built with extreme precision, brutalist geometry, and real-time backend synchronization.

---

## 🛠️ The Tech Stack

*   **Frontend**: Next.js 14 (App Router), TypeScript, Vanilla CSS
*   **Design/Animations**: Framer Motion, GSAP (ScrollTrigger), Space Grotesk/Mono Typography
*   **Backend/Database**: Supabase (Auth, Postgres, Realtime Streams)
*   **Payments**: Stripe (Subscriptions, Webhooks)

---

## 🚀 Core Features

### 💎 **"Technical Luxury" Design System**
*   **0px Border Radius**: Modular, architectural brutalist feel.
*   **Space Mono/Grotesk**: High-precision display and data typography.
*   **Emerald Accent**: High-contrast signal system (`#00FF88`).
*   **GSAP Micro-Animations**: Smooth, professional transitions and scroll reveals.

### 📊 **Realtime Dashboard**
*   **Live Score Ingestion**: Log Stableford scores and see them appear instantly via Supabase Realtime channels.
*   **Dynamic Data Visuals**: Monospace performance charts and metric readouts.
*   **Protocol Status**: Realtime monitoring of subscription states and pool distribution.

### 💳 **Subscription Protocol**
*   **Stripe Integrated**: Automated monthly (£9.99) and annual (£99.99) plan handling.
*   **Impact Logic**: 30% of every subscription is automatically calculated and allocated to the user's chosen charity.

### 🔒 **Super Admin Portal**
*   **Draw Engine**: Simulate and publish lottery draws based on user scores.
*   **Entity Management**: Oversee charity catalogs and prize pool rollover logic.
*   **Evaluation Bypass**: Dedicated access for assignment review.

---

## 🏗️ Getting Started

### 1. Prerequisites
*   Node.js 18+
*   Supabase Account
*   Stripe Account (Test Mode)

### 2. Environment Setup
Create a `.env.local` file with the following keys:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Installation
```bash
npm install
npm run dev
```

---

## 🧪 Evaluation Credentials (FOR JUDGES)

**Admin Panel Access**:
*   **URL**: `/admin`
*   **Email**: `admin@parside.com`
*   **Password**: `Admin123!`

---

## ✅ Performance & Layout
*   **Lighthouse**: Optimized for Accessibility and Performance.
*   **Responsive**: Fully liquid layout for Desktop and Mobile (Monospace Ticker active).

---

*Built by Anubhab Rakshit— 2026*
