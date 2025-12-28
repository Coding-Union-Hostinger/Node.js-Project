# Time-wise 4-digit Results App ✅

Simple Node.js + Express app to upload 4-digit results (per time) and manage them via an admin panel at `/admin` (protected by HTTP Basic Auth).

## Features
- POST /api/results to upload a result: { time, code } where `code` is 4 digits
- `/admin` UI for listing, adding, and deleting results (HTTP Basic Auth using `ADMIN_USER`/`ADMIN_PASS`)
- MongoDB (config via `MONGODB_URI`)

## Quick start 🔧
1. Copy `.env.example` to `.env` and set values:

```
MONGODB_URI=mongodb://localhost:27017/nodejs_project
PORT=3000
ADMIN_USER=admin
ADMIN_PASS=secret
```

2. Run MongoDB locally with Docker (optional):

```
docker-compose up -d
```

3. Install deps and start:

```
npm install
npm run dev
```

4. Use API:
- POST /api/results { time, code } (code must be 4 digits)
- GET /api/results?time=12:00

Visit `/admin` and authenticate with `ADMIN_USER`/`ADMIN_PASS`.

## Notes
- This is a minimal example. For production, add proper auth, rate limiting, input sanitization, tests, and deployment steps.
