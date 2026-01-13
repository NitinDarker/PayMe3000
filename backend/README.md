# PayTM Backend

REST API server for the PayTM digital payment application.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 4.18
- **Language:** TypeScript 5.9
- **Database:** MongoDB 8.x with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** Zod
- **Security:** bcrypt for password hashing

## Project Structure

```
src/
├── index.ts              # Express app setup & server
├── db/
│   └── index.ts          # Mongoose schemas & models
├── routes/
│   ├── index.ts          # Route aggregator
│   ├── user.ts           # User routes
│   └── account.ts        # Account routes
├── controllers/
│   ├── user/
│   │   ├── signup.ts     # User registration
│   │   ├── signin.ts     # User login
│   │   ├── me.ts         # Get authenticated user
│   │   ├── updateUser.ts # Update user profile
│   │   └── bulk.ts       # Search users
│   └── account/
│       ├── createAccount.ts  # Create account
│       ├── balance.ts        # Get balance
│       └── transfer.ts       # Transfer money
├── middlewares/
│   ├── auth.ts           # JWT verification
│   └── index.ts          # Middleware exports
└── types/
    └── express.d.ts      # Express type augmentation
```

## Database Models

### User
| Field | Type | Constraints |
|-------|------|-------------|
| username | String | unique, lowercase, 3-30 chars |
| phone | Number | unique, 10 digits (validated with min/max) |
| password | String | hashed with bcrypt, min 8 chars |
| firstName | String | required, max 30 chars |
| lastName | String | required, max 30 chars |

### Account
| Field | Type | Description |
|-------|------|-------------|
| balance | Number | Stored as integers (paisa), e.g., 5000 = ₹50.00 |
| userId | ObjectId | Reference to User |

## API Endpoints

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/signup` | Register new user | No |
| POST | `/signin` | Login and get JWT token | No |
| GET | `/me` | Get current user info + balance | Yes |
| POST | `/update` | Update user profile (password hashed) | Yes |
| GET | `/bulk?filter=` | Search users by name/phone | Yes |

### Account Routes (`/api/account`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/balance` | Get user's balance | Yes |
| POST | `/transfer` | Transfer money to another user | Yes |

## Authentication

- JWT tokens issued on signup/signin
- Include token in requests: `Authorization: Bearer <token>`
- Token payload: `{ userId, username }`

## Setup

### 1. Start MongoDB (Docker)

MongoDB requires a **replica set** for transaction support:

```bash
# Start MongoDB with replica set
docker run -d --name paytm-mongodb -p 27017:27017 -v mongo_data:/data/db mongo:latest --replSet rs

# Initialize replica set (first time only)
docker exec paytm-mongodb mongosh --eval "rs.initiate({_id: 'rs', members: [{_id: 0, host: 'localhost:27017'}]})"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
# .env
MONGODB_URI=mongodb://localhost:27017/paytm
JWT_KEY=your_secret_key
PORT=3001
```

### 4. Run development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
npm start
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Compile TypeScript and run server |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled JavaScript |

## Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT-based authentication
- Input validation with Zod
- ACID-compliant money transfers using MongoDB transactions
