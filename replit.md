# Firehawk Drone Website

## Overview

The Firehawk Drone Website is a modern, tech-forward marketing website showcasing an emergency first-aid delivery drone created by three 13-year-old innovators (Ron, Anik, and Trim). The site features a premium product presentation inspired by DJI, Apple, and Tesla design philosophies, emphasizing innovation, technical excellence, and life-saving capabilities. The website includes detailed drone specifications, photo galleries, team information, and an admin dashboard for managing contact inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter, a lightweight routing library. Routes include:
- Homepage (`/`) - Main product showcase
- Admin login (`/admin`) - Simple authentication page
- Admin dashboard (`/admin/dashboard`) - Contact message management
- 404 page for unmatched routes

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. Authentication state is managed via localStorage (simple admin auth).

**UI Component System**: Shadcn/ui component library (New York style) with Radix UI primitives, providing accessible and customizable components. All UI components follow a consistent design system with Tailwind CSS for styling.

**Form Handling**: React Hook Form with Zod schema validation for type-safe form validation, particularly for the contact form.

**Design System**: 
- Tailwind CSS with custom configuration for consistent spacing, colors, and typography
- Custom CSS variables for theming (light mode focused)
- Typography: Inter (primary), Space Mono (technical/monospace)
- Color system based on HSL values with semantic naming (primary, secondary, muted, accent, destructive)
- Consistent spacing scale using Tailwind's spacing units
- Component variants using class-variance-authority

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript support.

**Environment-Based Serving**:
- Development: Vite middleware integrated into Express for HMR and instant updates
- Production: Static file serving from pre-built dist directory

**API Design**: RESTful API endpoints under `/api` prefix:
- `POST /api/contact` - Create new contact message
- `GET /api/contact` - Retrieve all contact messages
- `GET /api/contact/:id` - Retrieve specific contact message
- `POST /api/contact/:id/reply` - Reply to a contact message

**Data Validation**: Zod schemas shared between client and server (in `shared/schema.ts`) for type-safe validation across the stack.

**Storage Layer**: Abstracted storage interface (`IStorage`) with in-memory implementation (`MemStorage`). The architecture supports easy migration to database-backed storage while maintaining the same interface.

**Logging**: Custom logging utility with formatted timestamps and source identification for request/response tracking.

### Data Storage Solutions

**Current Implementation**: In-memory storage using JavaScript Maps for rapid prototyping and development.

**Database Schema Design** (prepared via Drizzle ORM):
- **users table**: id (UUID), username (unique), password
- **contact_messages table**: id (UUID), name, email, subject, message, status (default: "new"), reply, createdAt, repliedAt

**ORM**: Drizzle ORM configured for PostgreSQL with migrations directory setup, enabling straightforward database integration when needed.

**Data Models**:
- User model for future authentication system
- ContactMessage model with status tracking and reply functionality
- Type-safe schemas using Zod for runtime validation and TypeScript types for compile-time safety

### Authentication and Authorization

**Current Approach**: Simple client-side authentication check using localStorage for admin access. This is a placeholder for demonstration purposes.

**Admin Access**: Hardcoded credentials (username: "admin", password: "admin") with localStorage-based session persistence.

**Protected Routes**: Admin dashboard checks localStorage for authentication state and redirects to login if not authenticated.

**Future Considerations**: The architecture supports upgrading to session-based authentication (express-session with connect-pg-simple already included as dependency) or JWT-based authentication as the application scales.

### External Dependencies

**UI & Styling**:
- Radix UI primitives (accordion, dialog, dropdown, select, toast, etc.) for accessible components
- Tailwind CSS for utility-first styling
- class-variance-authority and clsx for dynamic className composition

**Data Management**:
- TanStack Query for server state management and caching
- React Hook Form for form state management
- Zod for schema validation

**Database & ORM** (prepared but not actively used):
- Drizzle ORM for type-safe database queries
- @neondatabase/serverless for PostgreSQL connection
- drizzle-kit for migrations

**Development Tools**:
- Vite for fast development and optimized production builds
- TypeScript for type safety across the codebase
- TSX for running TypeScript in Node.js

**Date Handling**:
- date-fns for date formatting and manipulation

**Routing**:
- Wouter for lightweight client-side routing

**Build & Deployment**:
- esbuild for server-side bundling in production
- Custom Vite configuration with aliases for clean imports (@/, @shared/, @assets/)

**Assets**: Generated images stored in `attached_assets/generated_images/` for drone photos, team portraits, and technical shots.