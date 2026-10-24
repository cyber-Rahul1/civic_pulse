# CivicPulse Local Infrastructure Guide

This directory contains the Docker Compose configurations and initialization scripts required for local development.

## Services Started
- **MongoDB 7.0**: Document database with individual logical databases configured per microservice. Bound strictly to `127.0.0.1:27017` to prevent accidental public exposure.
- **Redis 7.2 Alpine**: In-memory cache and BullMQ job queue broker. Bound strictly to `127.0.0.1:6379`. Password protected.

## Starting Infrastructure

From the root directory:
```bash
# 1. Ensure .env is present
cp .env.example .env

# 2. Start services in detached mode
docker compose -f infrastructure/docker/docker-compose.yml up -d
```

## Verifying Health Status
Check container status and health:
```bash
docker compose -f infrastructure/docker/docker-compose.yml ps
```
Both containers will show `(healthy)` within 10-15 seconds.

## Stopping Infrastructure
To stop without losing data (volumes remain preserved):
```bash
docker compose -f infrastructure/docker/docker-compose.yml down
```

To stop and wipe all local databases for a fresh start:
```bash
docker compose -f infrastructure/docker/docker-compose.yml down -v
```

## Logical Database Architecture & Credentials
Each backend microservice connects to its own logical database using least-privilege credentials:

| Service | Database Name | Username | Password |
|---|---|---|---|
| Identity Service | `civic_identity` | `civic_identity_user` | `identity_dev_secret` |
| Reports Service | `civic_reports` | `civic_reports_user` | `reports_dev_secret` |
| Community Service | `civic_community` | `civic_community_user` | `community_dev_secret` |
| Authority Service | `civic_authority` | `civic_authority_user` | `authority_dev_secret` |
| Moderation Service | `civic_moderation` | `civic_moderation_user` | `moderation_dev_secret` |

**Security Note:** Microservices are prevented from performing cross-database queries. Cross-service interactions must occur exclusively through versioned REST APIs or asynchronous domain events dispatched via BullMQ.
