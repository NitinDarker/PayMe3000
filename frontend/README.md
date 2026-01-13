# PayTM Frontend

React single-page application for the PayTM digital payment platform.

## Tech Stack

- **Framework:** React 19.1
- **Build Tool:** Vite 7.1
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1
- **Routing:** React Router DOM 7.9
- **HTTP Client:** Axios
- **Forms:** React Hook Form with Zod validation
- **UI Components:** Radix UI, shadcn/ui patterns
- **Icons:** Lucide React, Tabler Icons
- **Animations:** Motion
- **Notifications:** React Hot Toast
- **Theming:** next-themes

## Project Structure

```
src/
├── App.tsx                    # Main router & routes
├── main.tsx                   # React entry point
├── index.css                  # Global styles
├── components/
│   ├── pages/
│   │   ├── Landing.tsx        # Hero landing page
│   │   ├── Signup.tsx         # Registration form
│   │   ├── Signin.tsx         # Login form
│   │   └── Dashboard.tsx      # Main app dashboard
│   └── ui/
│       ├── button.tsx         # Button component
│       ├── card.tsx           # Card container
│       ├── input.tsx          # Form input
│       ├── label.tsx          # Form label
│       ├── Avatar.tsx         # User avatar with initials
│       ├── myNavbar.tsx       # Dashboard navbar
│       ├── allUsers.tsx       # User search & list
│       ├── welcome.tsx        # Balance display
│       ├── hero.tsx           # Landing hero section
│       └── dotBackground.tsx  # Decorative background
└── lib/
    ├── protectedRoute.tsx     # Auth route guard
    ├── themeProvider.tsx      # Theme context
    ├── useTheme.ts            # Theme hook
    └── utils.ts               # Utility functions
```

## Pages

### Landing (`/`)
- Hero section with gradient effects
- Navigation to signup/signin

### Signup (`/signup`)
- Registration form with validation
- Fields: username, phone, firstName, lastName, password
- Auto-redirects to dashboard on success

### Signin (`/signin`)
- Login form
- Fields: username, password
- JWT token stored in localStorage

### Dashboard (`/dashboard`)
- Protected route (requires authentication)
- Displays user balance
- Search and view other users
- Send money functionality

## Components

### ProtectedRoute
Wrapper component that validates JWT token and redirects unauthorized users.

### Avatar
Displays user initials with gradient backgrounds, cycling through 6 color themes.

### AllUsers
Searchable user list with debounced input (300ms) and grid layout.

### Welcome
Shows greeting with user's name and current balance.

## Setup

1. Install dependencies
```bash
npm install
```

2. Start development server
```bash
npm run dev
```
Application runs at `http://localhost:5173`

3. Build for production
```bash
npm run build
```

4. Preview production build
```bash
npm run preview
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Configuration

### Path Aliases
`@/*` resolves to `src/*` for cleaner imports:
```typescript
import { Button } from "@/components/ui/button"
```

### API Base URL
Configure backend URL in axios calls (default: `http://localhost:3000`)
