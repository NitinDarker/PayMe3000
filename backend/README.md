# PayTM Backend

REST API for the PayTM payment application.

## Tech Stack

- Node.js, Express.js, TypeScript
- MongoDB with Mongoose
- JWT Authentication, bcrypt, Zod

## Quick Start

### 1. Start MongoDB (Docker)

```bash
docker run -d --name paytm-mongodb -p 27017:27017 -v mongo_data:/data/db mongo:latest --replSet rs

# Initialize replica set (first time only)
docker exec paytm-mongodb mongosh --eval "rs.initiate({_id: 'rs', members: [{_id: 0, host: 'localhost:27017'}]})"
```

### 2. Configure Environment

```bash
# .env
MONGODB_URI=mongodb://localhost:27017/paytm
JWT_KEY=your_secret_key
PORT=3001
```

### 3. Run

```bash
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/user/signup` | Register | No |
| POST | `/api/user/signin` | Login | No |
| GET | `/api/user/me` | Get user + balance | Yes |
| POST | `/api/user/update` | Update profile | Yes |
| GET | `/api/user/bulk?filter=` | Search users | Yes |
| GET | `/api/account/balance` | Get balance | Yes |
| POST | `/api/account/transfer` | Send money | Yes |
| GET | `/api/account/history` | Transaction history | Yes |
