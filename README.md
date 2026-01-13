# PayTM

A full-stack digital payment application with user authentication, wallet management, and money transfers.

## Tech Stack

**Backend:** Node.js, Express, TypeScript, MongoDB, JWT
**Frontend:** React 19, TypeScript, Vite, Tailwind CSS

## Quick Start

### Prerequisites

- Node.js 18+
- Docker (for MongoDB)

### 1. Start MongoDB

```bash
docker run -d --name paytm-mongodb -p 27017:27017 -v mongo_data:/data/db mongo:latest --replSet rs

# Initialize replica set (first time only)
docker exec paytm-mongodb mongosh --eval "rs.initiate({_id: 'rs', members: [{_id: 0, host: 'localhost:27017'}]})"
```

### 2. Backend

```bash
cd backend
npm install

# Create .env
echo "MONGODB_URI=mongodb://localhost:27017/paytm
JWT_KEY=your_secret_key
PORT=3001" > .env

npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

**Frontend:** http://localhost:5173
**Backend:** http://localhost:3001

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/signup` | Register |
| POST | `/api/user/signin` | Login |
| GET | `/api/user/me` | Get user + balance |
| GET | `/api/user/bulk?filter=` | Search users |
| POST | `/api/account/transfer` | Send money |
| POST | `/api/account/deposit` | Add money |
| GET | `/api/account/history` | Transaction history |

## License

MIT - see [LICENSE](LICENSE)
