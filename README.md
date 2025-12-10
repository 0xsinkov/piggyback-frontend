## Getting Started

First, install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

### Core Framework

- **Next.js 15.1.6** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5.7.3** - Type-safe development

### Styling & UI

- **Tailwind CSS 4.0.3** - Utility-first CSS framework (v4 with native CSS support)
- **Shadcn/ui** - Modern component library built on Radix UI
- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful icon library

### State Management & API

- **TanStack Query 5.66.0** - Powerful data synchronization for React
- **React Hook Form 7.54.2** - Performant forms with easy validation
- **Zod 3.24.1** - TypeScript-first schema validation

### Development Tools

- **ESLint 9.19.0** - Modern linting with flat config
- **Prettier 3.4.2** - Code formatting with Tailwind plugin
- **Husky 9.1.7** - Git hooks for code quality
- **PNPM 9.12.1** - Fast, disk space efficient package manager

### Environment & Configuration

- **T3 Env** - Type-safe environment variables with Zod validation
- **JOSE** - JWT token handling
- **Cookies Next** - Cookie management for Next.js

## Project Structure & Approaches

### Folder Organization

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups for auth pages
│   ├── (public)/          # Public route group
│   └── api/               # API routes
├── api/
│   ├── fetcher/           # HTTP client configuration
│   └── services/          # API service layer
├── components/
│   ├── providers/         # React context providers
│   └── ui/                # Shadcn/ui components
├── constants/             # Application constants
├── env/                   # Environment variable validation
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

### Key Architectural Decisions

**Authentication & Authorization**

- JWT-based authentication with access/refresh token pattern
- Server and client environment variable validation
- Cookie-based token storage with secure defaults

**Form Handling**

- React Hook Form with Zod resolvers for type-safe validation
- Client-side validation with server-side error handling
- Reusable form components with consistent error states

**Data Fetching**

- TanStack Query for server state management
- SSR + CSR hybrid approach (prefetch + initial data)
- Optimistic updates and background refetching
- Automatic error handling and retry logic

**Code Quality**

- Strict TypeScript configuration with path mapping
- ESLint with comprehensive rule set (Vercel style guide)
- Prettier with automatic formatting and import sorting
- Pre-commit hooks for code quality enforcement

**Styling**

- Tailwind CSS v4 with native CSS integration
- Custom design tokens and utility classes
- Component-based architecture with shadcn/ui
- Responsive design patterns and accessibility standards

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Client-side (must be prefixed with NEXT_PUBLIC_)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Server-side
JWT_PUBLIC_KEY=your-jwt-public-key
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint-fix` - Fix ESLint issues
- `pnpm prettier-check` - Check Prettier formatting
- `pnpm prettier-fix` - Fix Prettier formatting
- `pnpm type-check` - Run TypeScript compiler

## Features

- 🚀 **Modern Stack** - Latest versions of Next.js, React, and TypeScript
- 🎨 **Beautiful UI** - Shadcn/ui components with Tailwind CSS v4
- 🔐 **Authentication** - Complete auth flow with JWT tokens
- 📱 **Responsive** - Mobile-first design with Tailwind CSS
- 🔍 **Type Safety** - End-to-end TypeScript with Zod validation
- ⚡ **Performance** - Optimized with TanStack Query and Next.js 15
- 🛠️ **Developer Experience** - ESLint, Prettier, and Husky configured
- 🎯 **Production Ready** - Environment validation and error handling
