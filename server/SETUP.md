# Database Setup Instructions

This application requires **MongoDB** and **Redis** to be running. Here are your options:

## Option 1: Docker (Recommended)

### Install Docker Desktop
1. Download Docker Desktop for Windows from: https://www.docker.com/products/docker-desktop
2. Install and restart your computer if prompted
3. Start Docker Desktop

### Start Databases
Once Docker is installed, run from the project root:
```bash
docker compose up -d
```

This will start:
- MongoDB on `localhost:27017`
- Redis on `localhost:6379`

## Option 2: Local Installation

### MongoDB
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install MongoDB
3. Start MongoDB service (usually starts automatically)

### Redis
1. Download Redis for Windows: https://github.com/microsoftarchive/redis/releases
   OR use WSL2: https://redis.io/docs/getting-started/installation/install-redis-on-windows/
2. Start Redis server

## Option 3: Cloud Services (Free Tiers)

### MongoDB Atlas (Free)
1. Sign up at: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string and update `MONGO_URI` in `.env`

### Redis Cloud (Free)
1. Sign up at: https://redis.com/try-free/
2. Create a free database
3. Update `REDIS_HOST` and `REDIS_PORT` in `.env`

## Verify Installation

After setting up databases, verify they're running:
- MongoDB: Check if port 27017 is open
- Redis: Check if port 6379 is open

Then run:
```bash
npm run dev
```

The server should connect successfully!

