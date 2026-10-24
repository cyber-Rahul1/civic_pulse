# CivicPulse Local Environment, Testing & Troubleshooting Guide

This guide describes how to start, test, manage, and troubleshoot the CivicPulse development environment.

---

## 1. Prerequisites

- **Node.js**: >= 20.x (Recommended: Node 20 LTS or Node 24)
- **npm**: >= 10.x
- **Docker & Docker Compose**: Recent version with Docker Engine running.

---

## 2. Starting Local Infrastructure

The local infrastructure consists of containerized **MongoDB 7.0** and **Redis 7.2**, pre-configured with persistent development volumes and isolated credentials.

1. Ensure environment variables are configured:
   ```bash
   # From the workspace root
   cp .env.example .env
   ```
2. Launch infrastructure:
   ```bash
   npm run docker:up
   ```
   *(Or alternatively: `docker compose -f infrastructure/docker/docker-compose.yml up -d`)*
3. Verify container health:
   ```bash
   docker compose -f infrastructure/docker/docker-compose.yml ps
   ```
   Both `civic_mongo` and `civic_redis` should display `(healthy)`.

---

## 3. Building and Starting Microservices

1. Install all dependencies across all workspaces:
   ```bash
   npm install
   ```
2. Build all shared libraries and services:
   ```bash
   npm run build
   ```
3. Start the Identity Service:
   ```bash
   npm run start:dev --workspace=@civic-pulse/identity-service
   ```
4. Verify the service health endpoint:
   ```bash
   curl http://localhost:3001/api/v1/health
   ```
   Expected response:
   ```json
   {
     "success": true,
     "statusCode": 200,
     "data": {
       "service": "identity-service",
       "version": "1.0.0",
       "status": "healthy",
       "timestamp": "2026-10-24T10:00:00.000Z",
       "uptimeSeconds": 15,
       "environment": "development",
       "checks": {
         "database": {
           "status": "up",
           "message": "Connected to logical database civic_identity"
         }
       }
     },
     "error": null,
     "meta": {
       "timestamp": "2026-10-24T10:00:00.000Z",
       "correlationId": "...",
       "service": "identity-service",
       "version": "1.0.0"
     }
   }
   ```
5. View Swagger OpenAPI interactive documentation:
   Open [http://localhost:3001/api/docs](http://localhost:3001/api/docs) in your browser.

---

## 4. Running Tests & Quality Checks

Run all unit tests across the entire monorepo:
```bash
npm run test
```

Run TypeScript strict type checking across all workspaces:
```bash
npm run typecheck
```

---

## 5. Stopping Infrastructure

To stop containers while preserving database volume data:
```bash
npm run docker:down
```

To stop containers and wipe development data for a fresh start:
```bash
docker compose -f infrastructure/docker/docker-compose.yml down -v
```

---

## 6. Troubleshooting Common Issues

### Issue: Port 27017 or 6379 Already in Use
**Symptom**: Docker returns `bind: Only one usage of each socket address is normally permitted`.
**Cause**: A local instance of MongoDB (mongod) or Redis (memurai/wsl) is already running on standard ports on your host machine.
**Resolution**:
- The project defaults to host port **27018** for MongoDB and **6380** for Redis in `docker-compose.yml` and `.env.example`.
- Ensure your `.env` contains:
  ```env
  MONGO_PORT=27018
  REDIS_PORT=6380
  ```

### Issue: MongoDB Authentication Failure
**Symptom**: `MongoServerError: Authentication failed`.
**Resolution**:
- If you altered `.env` credentials after initial container creation, MongoDB's initialization script will not re-run on an existing volume.
- Reset the volume cleanly:
  ```bash
  docker compose -f infrastructure/docker/docker-compose.yml down -v
  docker compose -f infrastructure/docker/docker-compose.yml up -d
  ```

### Issue: Cross-Database Query Authorization Error
**Symptom**: `MongoServerError: not authorized on <database> to execute command`.
**Resolution**:
- This is intentional by architectural design. Microservices have scoped, least-privilege credentials. If you need data from another service, consume that service's REST API or subscribe to its BullMQ event topic.
