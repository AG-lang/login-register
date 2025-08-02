# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based login/register system built with Vite, featuring client-side authentication using localStorage. It demonstrates core React concepts including hooks, routing, and protected routes.

## Development Commands

### Core Commands

- `npm run dev` - Start development server on port 10000
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build

### Port Configuration

- **Frontend Development**: Port 10000 (configured in vite.config.js)
- **Backend (if added)**: Port 40000 (per project conventions)

## Architecture & Key Patterns

### Authentication Flow

- Uses localStorage for client-side auth simulation
- Default test user: `admin` / `123456` (initialized in utils/auth.js)
- Token-based auth with simple string tokens
- Protected routes redirect unauthenticated users to `/login`

### Core Components Structure

```text
src/
├── components/
│   └── PrivateRoute.jsx     # HOC for route protection
├── pages/                   # Page-level components
│   ├── LoginPage.jsx       # Handles user authentication
│   ├── RegisterPage.jsx    # New user registration
│   └── HomePage.jsx        # Protected main page
├── utils/
│   └── auth.js             # Authentication utilities
└── App.jsx                 # Router configuration with createBrowserRouter
```

### State Management Patterns

- **Controlled Components**: All forms use controlled inputs with useState
- **Authentication State**: Managed via localStorage with utility functions
- **Form State**: Local component state with error handling and loading states

### Routing Architecture

- Uses React Router v6 with `createBrowserRouter` (declarative configuration)
- Protected routes wrapped with `<PrivateRoute>` component
- 404 fallback route with styled error page
- Navigation uses `useNavigate` hook with `replace: true` for login redirects

### Key React Patterns Used

1. **Hooks**: useState, useEffect, useNavigate
2. **Higher-Order Components**: PrivateRoute wrapper
3. **Controlled Components**: Form inputs managed by React state
4. **Conditional Rendering**: Based on auth state and loading states
5. **Event Handling**: Async form submissions with error handling

## Development Guidelines

### Code Style

- All comments are in Chinese (per project convention)
- Function components with hooks (no class components)
- Async/await pattern for form submissions
- Controlled components for all form inputs

### Authentication Implementation

- Auth state checked via `localStorage.getItem('token')`
- User data stored as JSON in localStorage
- Simple token generation: `token_${userId}_${timestamp}`
- Auth utilities in `src/utils/auth.js` for reusability

### Testing Account

- Default user automatically initialized on app start
- Username: `admin`, Password: `123456`
- Or users can register new accounts through the UI

## File Handling Notes

- Chinese encoding compatibility required for Windows systems
- Remove emojis and special characters from test scripts
- Comments and UI text are in Chinese

## Browser Testing

- Project runs on [http://localhost:10000](http://localhost:10000)
- Test the full authentication flow: register → login → protected page → logout
- Verify localStorage persistence across browser sessions