# PayTM - Digital Payment Application

A full-stack fintech payment application that enables users to manage digital wallets, view balances, and transfer money to other users.

## Features

- **User Authentication** - Secure signup/signin with JWT-based authentication
- **Account Management** - View balance and manage profile
- **Money Transfer** - Send money to other users with ACID-compliant transactions
- **User Search** - Find and connect with other users

## Tech Stack

### Backend
- Node.js + Express.js
- TypeScript
- MongoDB with Mongoose ODM
- JWT Authentication
- Zod Validation
- bcrypt Password Hashing

### Frontend
- React 19 with Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- React Hook Form
- Axios

## Project Structure

```
paytm/
├── backend/           # Express.js REST API
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API endpoints
│   │   ├── middlewares/   # Auth middleware
│   │   ├── db/            # Database models
│   │   └── index.ts       # App entry point
│   └── package.json
│
├── frontend/          # React SPA
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── lib/           # Utilities & hooks
│   │   └── App.tsx        # Main router
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker (for MongoDB) or MongoDB Atlas account

### Running MongoDB with Docker

MongoDB must run as a **replica set** for transaction support:

```bash
# Start MongoDB with replica set
docker run -d --name paytm-mongodb -p 27017:27017 -v mongo_data:/data/db mongo:latest --replSet rs

# Initialize the replica set (first time only)
docker exec paytm-mongodb mongosh --eval "rs.initiate({_id: 'rs', members: [{_id: 0, host: 'localhost:27017'}]})"
```

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd paytm
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Configure backend environment
```bash
# Create .env file with:
MONGODB_URI=mongodb://localhost:27017/paytm
JWT_KEY=your_secret_key
PORT=3001
```

4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend API on `http://localhost:3001`.

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/user/signup` | Register new user | No |
| POST | `/api/user/signin` | Login user | No |
| GET | `/api/user/me` | Get current user + balance | Yes |
| POST | `/api/user/update` | Update profile | Yes |
| GET | `/api/user/bulk` | Search users | Yes |
| GET | `/api/account/balance` | Get balance | Yes |
| POST | `/api/account/transfer` | Transfer money | Yes |

## License

MIT
