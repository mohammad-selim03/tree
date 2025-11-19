# TreeVerse

AI-Powered Tree & Plant Marketplace.

## Prerequisites

- Node.js 18+
- Docker & Docker Compose

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start infrastructure** (Postgres, Redis, MinIO):
   ```bash
   docker-compose up -d
   ```

3. **Generate Prisma Client**:
   ```bash
   npx turbo db:generate
   ```

4. **Start Development Server**:
   ```bash
   npx turbo dev
   ```

## Project Structure

- `apps/web`: Next.js 16 application
- `packages/core`: Domain logic (DDD)
- `packages/database`: Prisma schema and client
- `packages/ui`: Shared UI components

## Architecture

See [implementation_plan.md](./implementation_plan.md) for detailed architecture documentation.
