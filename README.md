# CivicPulse Monorepo

Mobile-first civic issue reporting and accountability platform built with React Native (Expo) and NestJS/Fastify microservices.

## Architecture & Workspaces Overview

```
civic_pulse/
├── apps/
│   ├── mobile/                    # React Native + Expo Mobile Application
│   └── api-gateway/               # Fastify/NestJS reverse proxy & edge gateway
├── services/                      # Independently deployable microservices
│   ├── identity-service/          # Auth, roles, user accounts
│   ├── reports-service/           # Civic issue reports lifecycle & MongoDB outbox
│   ├── community-service/         # Upvotes, comments, local discussions
│   ├── authority-service/         # Municipal departments, SLAs, official responses
│   ├── media-service/             # Media uploads & Cloudinary integration (Phase 2+)
│   ├── notifications-service/     # Push (FCM), SMS, Email dispatcher
│   ├── ai-service/                # Report deduplication, classification, computer vision
│   ├── social-publishing-service/ # X/Twitter, FB civic escalation channels
│   └── moderation-service/        # Content filtering & review
├── workers/                       # BullMQ background workers consuming outbox events
│   └── event-dispatcher-worker/
├── packages/                      # Shared libraries (contracts, utilities - NO db models)
│   ├── contracts/                 # Shared DTOs, interfaces, event schemas, API types
│   ├── nest-common/               # Shared NestJS/Fastify core (logger, correlation, filters)
│   └── tsconfig/                  # Shared TypeScript configuration
├── infrastructure/
│   ├── docker/                    # Docker Compose for MongoDB & Redis
│   └── mongo-init/                # Initialization scripts for per-service logical DBs
├── docs/
│   └── adr/                       # Architecture Decision Records
└── package.json                   # Root workspace manifest
```

## Quick Start (Phase 0 Foundation)

### Prerequisites
- Node.js >= 20 (Tested on Node v24)
- npm >= 10
- Docker & Docker Compose

### 1. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env
```

### 2. Infrastructure
Start MongoDB and Redis in background:
```bash
docker compose -f infrastructure/docker/docker-compose.yml up -d
```
Verify health:
```bash
docker compose -f infrastructure/docker/docker-compose.yml ps
```

### 3. Install & Build
```bash
npm install
npm run build
```

### 4. Running Services (Phases 1, 2, 3, and 4)
In separate terminals or as background processes:
```bash
# 1. Start Identity Service (Port 3001)
npm run start --workspace=@civic-pulse/identity-service

# 2. Start Reports & Media Service (Port 3002)
npm run start --workspace=@civic-pulse/reports-service

# 3. Start Community Service (Port 3003)
npm run start --workspace=@civic-pulse/community-service

# 4. Start Authority Service (Port 3004)
npm run start --workspace=@civic-pulse/authority-service

# 5. Start Notifications Service (Port 3005)
npm run start --workspace=@civic-pulse/notifications-service

# 6. Start API Gateway (Port 3000)
npm run start --workspace=@civic-pulse/api-gateway
```

Health & Gateway Readiness:
```bash
# Gateway unified health status across all 5 microservices
curl http://localhost:3000/health

# Swagger OpenAPI docs:
# Gateway:       http://localhost:3000/api/docs
# Identity:      http://localhost:3001/api/docs
# Reports:       http://localhost:3002/api/docs
# Community:     http://localhost:3003/api/docs
# Authority:     http://localhost:3004/api/docs
# Notifications: http://localhost:3005/api/docs
```

### 5. Running Tests & Quality Checks
```bash
npm run build
npm run typecheck
npm run test

# Run live Phase 2 regression suite:
node test-phase2-e2e.mjs

# Run live Phase 3 integration suite (Community & Authority Workflows):
node test-phase3-e2e.mjs

# Run Phase 3 audit and hardening regression test suites:
node test-phase3-1-audit.mjs
node test-phase3-2-revocation.mjs
node test-phase3-3-integrity.mjs
node test-phase3-4-durability.mjs

# Run live Phase 4 end-to-end integration suite (Notifications & Event Delivery):
node test-phase4-e2e.mjs

# Run live Phase 4.1 durability and outage recovery test:
node test-phase4-1-durability.mjs
```

---

## CivicPulse Mobile Application (Phase 5)

**Product Tagline:** *Your community. Your voice.*

The mobile application is a production-oriented React Native application built with Expo and TypeScript located in [`apps/mobile`](file:///c:/Users/Rahul/Desktop/civic_pulse/apps/mobile).

### 1. Mobile Architecture
- **Framework**: React Native 0.74, Expo 51, TypeScript.
- **State & Session**: `AuthProvider` and `useAuth` hook managing encrypted JWT access/refresh token pairs via `expo-secure-store`.
- **API Communication**: Centralized, typed `ApiClient` connecting exclusively to the API Gateway on port 3000.
- **Design System**: Accessible civic tokens (`tokens.ts`) with high-contrast semantics, unified typography, status badges, and feedback cards.
- **Deep Linking**: Notification payloads navigate directly to reports via standard URI path matching (`/reports/:id`).
- **No Paid AI Scope**: Search, nearby duplicate discovery, and category filtering use ordinary application logic and MongoDB geospatial indexes without external AI API dependencies.

### 2. Environment Variables & Gateway Resolution
The mobile app communicates with API Gateway via `EXPO_PUBLIC_API_GATEWAY_URL`:

| Environment | Target Address | Notes |
| :--- | :--- | :--- |
| **Android Emulator** | `http://10.0.2.2:3000` | Loopback address for Android emulator to host |
| **iOS Simulator / Local** | `http://127.0.0.1:3000` | Localhost loopback |
| **Physical Device (Expo Go)** | `http://<LAN_IP>:3000` | Replace `<LAN_IP>` with your computer's local Wi-Fi IP address |

Example `.env` in `apps/mobile`:
```env
EXPO_PUBLIC_API_GATEWAY_URL=http://127.0.0.1:3000
```

### 3. How to Start the Mobile App
```bash
# Start Expo development server:
npm run start --workspace=@civic-pulse/mobile

# Or run directly on platform:
npm run android --workspace=@civic-pulse/mobile
npm run ios --workspace=@civic-pulse/mobile
npm run web --workspace=@civic-pulse/mobile
```

### 4. Running Mobile Tests
```bash
npm test --workspace=@civic-pulse/mobile
```


