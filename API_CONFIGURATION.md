# Octofit Tracker API - Node.js Configuration Guide

## Environment Setup

The backend API is configured to run on **port 8000** with automatic support for both GitHub Codespaces and localhost development.

### 🔧 Configuration File
**Location**: `octofit-tracker/backend/src/config/environment.ts`

```typescript
export function loadConfig(): AppConfig {
  const codespaceName = process.env.CODESPACE_NAME;
  const nodeEnv = process.env.NODE_ENV || 'development';
  const port = parseInt(process.env.PORT || '8000', 10);

  // Build base URL based on environment
  let baseUrl: string;
  if (codespaceName) {
    // GitHub Codespaces format
    baseUrl = `https://${codespaceName}-8000.app.github.dev`;
  } else if (process.env.BASE_URL) {
    baseUrl = process.env.BASE_URL;
  } else {
    // Localhost fallback
    baseUrl = `http://localhost:${port}`;
  }

  // Configure CORS for both environments
  const corsOrigins = [
    'http://localhost:5173',    // Frontend dev server
    'http://localhost:3000',    // Alternative frontend port
  ];

  if (codespaceName) {
    corsOrigins.push(`https://${codespaceName}-5173.app.github.dev`);
  }

  return {
    port,
    nodeEnv,
    mongoDbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db',
    baseUrl,
    corsOrigins,
  };
}
```

## ✅ Verified Configuration

### Running on GitHub Codespaces
```
Environment: development
CODESPACE_NAME: animated-robot-pp69x556gwj39r97
API Base URL: https://animated-robot-pp69x556gwj39r97-8000.app.github.dev
Database: mongodb://localhost:27017/octofit_db
```

### Running Locally
```
Environment: development
API Base URL: http://localhost:8000
Database: mongodb://localhost:27017/octofit_db
```

## 🧪 Tested Endpoints

### 1. Health Check
```bash
GET /api/health
Response: ✅ 200
{
  "status": "ok",
  "baseUrl": "https://animated-robot-pp69x556gwj39r97-8000.app.github.dev"
}
```

### 2. User Registration
```bash
POST /api/users/register
Request:
{
  "username": "swimmer_alex",
  "email": "alex@example.com",
  "password": "password123"
}
Response: ✅ 201
{
  "message": "User created successfully",
  "user": { "username": "swimmer_alex", "email": "alex@example.com", ... }
}
```

### 3. Get User Profile
```bash
GET /api/users/{userId}
Response: ✅ 200
{
  "username": "swimmer_alex",
  "email": "alex@example.com",
  "profile": { "firstName": null, "lastName": null, ... }
}
```

### 4. Log Activity
```bash
POST /api/activities
Request:
{
  "user": "6a843cc4416c781fa2864af0",
  "type": "swimming",
  "duration": 45,
  "distance": 2.5,
  "calories": 450,
  "description": "Morning swim at the pool"
}
Response: ✅ 201
{
  "message": "Activity logged successfully",
  "activity": { "type": "swimming", "duration": 45, ... }
}
```

### 5. Get User Activities
```bash
GET /api/activities/user/{userId}
Response: ✅ 200
[
  {
    "type": "swimming",
    "duration": 45,
    "description": "Morning swim at the pool"
  }
]
```

### 6. Input Validation
```bash
POST /api/users/register
Request with invalid email:
{
  "username": "testuser",
  "email": "invalid-email",
  "password": "password123"
}
Response: ✅ 400 (Validation)
{
  "error": {
    "status": 400,
    "message": "Validation failed",
    "details": {
      "email": "email must be a valid email"
    }
  }
}
```

## 🚀 Starting the API

### Development Mode
```bash
npm run dev --prefix octofit-tracker/backend
```

Output:
```
✓ Connected to octofit_db
🐙 Octofit Tracker API running on https://animated-robot-pp69x556gwj39r97-8000.app.github.dev
Environment: development
Database: mongodb://localhost:27017/octofit_db
```

### Build for Production
```bash
npm run build --prefix octofit-tracker/backend
```

## 📋 Supported Endpoints Summary

| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| GET | `/api/health` | Health check | ✅ Tested |
| POST | `/api/users/register` | Register new user | ✅ Tested |
| GET | `/api/users/:id` | Get user profile | ✅ Tested |
| POST | `/api/activities` | Log activity | ✅ Tested |
| GET | `/api/activities/user/:userId` | Get user activities | ✅ Tested |
| GET | `/api/activities/stats/:userId` | Get activity stats | ✅ Available |
| GET | `/api/teams` | Get all teams | ✅ Available |
| POST | `/api/teams` | Create team | ✅ Available |
| GET | `/api/leaderboard` | Get global leaderboard | ✅ Available |
| GET | `/api/leaderboard/user/:userId/rank` | Get user rank | ✅ Available |

## 🔒 CORS Configuration

The API accepts requests from:

**Localhost**:
- `http://localhost:5173` (Vite frontend)
- `http://localhost:3000` (Alternative port)

**Codespaces**:
- `https://<codespace-name>-5173.app.github.dev` (Frontend)

## 📝 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 8000 | Server port |
| `MONGODB_URI` | mongodb://localhost:27017/octofit_db | Database connection |
| `NODE_ENV` | development | Environment mode |
| `CODESPACE_NAME` | auto-detected | GitHub Codespaces name |
| `BASE_URL` | auto-generated | Custom base URL override |

## ✨ Features

✅ Automatic Codespaces URL detection  
✅ Localhost fallback for local development  
✅ Dynamic CORS configuration  
✅ Input validation middleware  
✅ Error handling with proper HTTP status codes  
✅ Request logging with timestamps  
✅ MongoDB connection management  
✅ Service layer architecture  
