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

### 4. Running Services (Phase 1 & Phase 2)
In separate terminals or as managed processes:
```bash
# 1. Start Identity Service (Port 3001)
npm run start --workspace=@civic-pulse/identity-service

# 2. Start Reports & Media Service (Port 3002)
npm run start --workspace=@civic-pulse/reports-service

# 3. Start API Gateway (Port 3000)
npm run start --workspace=@civic-pulse/api-gateway
```

Health & Gateway Readiness:
```bash
# Gateway unified health status
curl http://localhost:3000/health

# Reports Service OpenAPI documentation
open http://localhost:3002/api/docs
```

### 5. Running Tests & Quality Checks
```bash
npm run build
npm run typecheck
npm run test

# Run live Phase 2 integration suite through API Gateway:
node test-phase2-e2e.mjs
```
