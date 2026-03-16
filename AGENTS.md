# Devroast Project Development Guidelines

This document provides comprehensive development guidelines for the Devroast project, covering the technology stack, architecture, coding standards, best practices, and workflows. All contributors should follow these guidelines to ensure consistency, maintainability, and quality.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [Development Setup](#development-setup)
5. [Coding Standards](#coding-standards)
6. [TypeScript Guidelines](#typescript-guidelines)
7. [Styling Guidelines](#styling-guidelines)
8. [UI Component Development](#ui-component-development)
9. [State Management](#state-management)
10. [Performance Optimization](#performance-optimization)
11. [Testing Guidelines](#testing-guidelines)
12. [Git Workflow](#git-workflow)
13. [Deployment](#deployment)
14. [Troubleshooting](#troubleshooting)
15. [Appendix: Useful Commands](#appendix-useful-commands)

## Project Overview

Devroast is a Next.js 16.1.6 application built with React 19.2.3, featuring a custom UI component library and Tailwind CSS v4 for styling. The project follows modern web development practices with TypeScript for type safety, Biome for code quality, and the Next.js App Router for routing and data fetching.

**Important**: The definitive design reference for all UI components and screens is the `.pen` file located in the project parent folder (`C:\Users\huann\dev\NLW_operator\devroast.pen`). All developers must always consult this file for exact design specifications, including dimensions, colors, spacing, and component layouts before implementing any UI changes.

## Technology Stack

### Core Framework
- **Next.js 16.1.6**: React framework with App Router, server components, and Turbopack compiler
- **React 19.2.3**: UI library with concurrent features
- **React DOM 19.2.3**: DOM-specific React methods

### Styling
- **Tailwind CSS v4**: Utility-first CSS framework with JIT compiler
- **tailwind-variants**: Utility for managing component variants
- **tailwind-merge**: Utility for intelligently merging Tailwind CSS classes

### Type Safety
- **TypeScript 5**: Strictly typed superset of JavaScript
- **@types/node**, **@types/react**, **@types/react-dom**: Type definitions

### Code Quality
- **@biomejs/biome 2.4.7**: All-in-one linter, formatter, and code checker
  - Linting: Identifies and fixes code issues
  - Formatting: Enforces consistent code style
  - Check: Runs both linting and formatting checks

### Development Tools
- **pnpm**: Fast, disk-space efficient package manager (MANDATORY - never use npm or yarn)
- **Next.js Dev Server**: Provides Fast Refresh and error overlays
- **Turbopack**: Next.js 16's incremental bundler (default in dev)

## Project Architecture

### Directory Structure
```
/devroast
├── /src                    # Source code
│   ├── /app               # Next.js App Router
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── ui-showcase.tsx # Component showcase
│   └── /components        # Reusable components
│       └── /ui            # Primitive UI components
│           └── button.tsx # Button component implementation
├── /public                # Static assets
├── .next                  # Next.js build output (gitignored)
├── node_modules           # Dependencies (gitignored)
├── .gitignore             # Git ignore rules
├── biome.json             # Biome configuration
├── next-env.d.ts          # Next.js TypeScript declarations
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── pnpm-lock.yaml         # pnpm lockfile
├── postcss.config.mjs     # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

### Key Architectural Decisions

1. **Next.js App Router**: Using the new app directory for routing, layouts, and server components
2. **Component Colocation**: UI components kept close to their usage in `/src/components/ui`
3. **Strict TypeScript**: Enforced via `tsconfig.json` with `strict: true`
4. **Tailwind CSS v4**: Utilizes the latest `@theme` and `@layer` syntax for design tokens
5. **Atomic UI Components**: Primitive components in `/src/components/ui` follow a strict variant pattern
6. **Zero Runtime TypeScript**: `noEmit: true` in tsconfig relies on Next.js's built-in TS compilation

## Development Setup

### Prerequisites
- Node.js 18.x or higher
- pnpm 8.x or higher (REQUIRED - do not use npm or yarn)
- Git 2.x or higher

### Installation
```bash
# Clone repository
git clone <repository-url>
cd devroast

# Install dependencies with pnpm (MANDATORY)
pnpm install
```

### Development Commands
| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server at http://localhost:3000 |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format code with Biome |
| `pnpm check` | Run both linting and formatting |

### Environment Variables
Currently no environment variables are required for basic operation. Add to `.env.local` if needed:
```
# Example environment variables
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Coding Standards

### File Organization
- Use PascalCase for component files: `Button.tsx`, `Card.tsx`
- Use lowercase with hyphens for non-component files: `utils.ts`, `constants.ts`
- Place component styles directly in the component file using Tailwind
- Keep files small and focused (under 200 lines when possible)

### Import Order
1. React imports
2. Next.js imports
3. Third-party library imports
4. Internal imports (from `@/` alias)
5. Type imports (when separated)

```typescript
// Correct import order
import type { ComponentProps } from "react";
import Link from "next/link";
import { tv, type VariantProps } from "tailwind-variants";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
```

### Naming Conventions
- Components: PascalCase (`Button`, `UserProfile`)
- Functions and variables: camelCase (`handleClick`, `userData`)
- Constants: UPPER_SNAKE_CASE (`MAX_ITEMS`, `API_ENDPOINT`)
- Types and interfaces: PascalCase (`ButtonProps`, `UserData`)
- Event handlers: Prefix with `handle` (`handleSubmit`, `onKeyDown`)
- Boolean variables: Prefix with `is`, `has`, `should` (`isVisible`, `hasError`)

### Code Formatting
Biome handles automatic formatting. Key rules:
- 2-space indentation (spaces, not tabs)
- 80-character line width
- Line endings: LF (Unix-style)
- Trailing commas in multi-line expressions
- Semicolons always required
- Double quotes for strings
- JSX attributes use double quotes

## TypeScript Guidelines

### Strict Mode
The project uses strict TypeScript settings:
- `strict`: Enables all strict type-checking options
- `noImplicitAny`: Disallows `any` type
- `strictNullChecks`: Enforces null/undefined checks
- `noImplicitReturns`: Ensures all code paths return value
- `noFallthroughCasesInSwitch`: Prevents fall-through in switch statements
- `noUncheckedIndexedAccess`: Adds undefined to indexed access types
- `noUnusedLocals` and `noUnusedParameters`: Reports unused declarations

### Type Definitions
- Prefer interfaces for object shapes that may be extended
- Use types for unions, tuples, and mapped types
- Avoid `any`; use `unknown` when type is uncertain and validate
- Never use `{}` or `Object` as a type; use `Record<string, unknown>` instead
- Prefer explicit return types for functions
- Use generics for reusable components and utilities

### Component Props
All components must:
1. Extend native HTML element props when applicable: `ComponentProps<"button">`
2. Define variant types using `VariantProps<typeof tvFunction>`
3. Combine base props with variant props using intersection types
4. Never use `any` for props
5. Mark required props explicitly (TypeScript infers optional from undefined)

```typescript
// Correct pattern for component props
type ButtonVariants = VariantProps<typeof button>;
type ButtonProps = ComponentProps<"button"> & ButtonVariants;

function Button({ variant, size, className, ...props }: ButtonProps) {
  // Implementation
}
```

### Error Handling
- Use `try/catch` for asynchronous operations
- Validate data at boundaries (API responses, form inputs)
- Create custom error types when needed
- Never ignore errors with empty catch blocks
- Log errors appropriately in development

## Styling Guidelines

### Tailwind CSS v4 Usage
The project uses Tailwind CSS v4 with the `@theme` directive for design tokens:

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Define design tokens here */
  --color-bg-page: #0a0a0a;
  --color-text-primary: #fafafa;
  /* ... */
}

@layer base {
  html,
  body {
    /* Base styles */
  }
}
```

### Design Tokens
All styling must use the defined CSS variables:
- Colors: `var(--color-bg-page)`, `var(--color-text-primary)`, etc.
- Fonts: `var(--font-mono)`, `var(--font-sans)`
- Radii: `var(--radius-none)`, `var(--radius-m)`, `var(--radius-pill)`
- Spacing: Use Tailwind scale or CSS variables

### Component Styling Rules
1. **Utility-First**: Apply styles directly in JSX using className
2. **Responsive Design**: Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
3. **State Variants**: Use variant prefixes (hover:, focus:, disabled:, dark:)
4. **Avoid Custom CSS**: Unless absolutely necessary, use Tailwind utilities
5. **Dark Mode**: Ensure components work in both light and dark modes
6. **Accessibility**: Maintain proper contrast ratios (minimum 4.5:1 for text)

### TV (Tailwind Variants) Pattern
All UI components must use the tailwind-variants pattern:

```typescript
import { tv, type VariantProps } from "tailwind-variants";

const component = tv({
  base: [
    // Base classes
  ],
  variants: {
    variant: {
      // Variant definitions
    },
    size: {
      // Size definitions
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type ComponentVariants = VariantProps<typeof component>;
type ComponentProps = ComponentProps<"element"> & ComponentVariants;

function Component({ variant, size, className, ...props }: ComponentProps) {
  return <element className={component({ variant, size, className })} {...props} />;
}
```

### Class Organization
When using `className` with multiple sources, follow this pattern:
1. **Use `tv` for component variants**: The `tailwind-variants` (`tv`) function is the primary tool for styling components and their variants. It handles merging base, variant, and passed `className` props internally.
    ```typescript
    // Inside a component using tv
    return <element className={component({ variant, size, className })} {...props} />;
    ```
2. **Use `twMerge` for conditional classes**: For conditional class logic *outside* of a `tv` function (e.g., in a page or complex component), use the `twMerge` utility for safe and predictable merging. Avoid string interpolation.
    ```typescript
    // In a page component
    import { twMerge } from "tailwind-merge";
    
    const className = twMerge("base-class", isActive && "active-class");
    ```

## UI Component Development

### UI Component Location
All primitive UI components must be placed in `/src/components/ui` and follow the established pattern.

### Component Requirements
1. **Type Safety**: Fully typed with props and variants
2. **Reusability**: Designed to be used across different contexts
3. **Accessibility**: Follows WCAD guidelines
4. **Performance**: Minimizes re-renders, uses React.memo when appropriate
5. **Documentation**: Clear prop types and usage examples
6. **Export Pattern**: Named exports only (never default export)

### Button Component Reference
The `Button` component in `/src/components/ui/button.tsx` is the reference implementation. All new components should follow this exact pattern:

```typescript
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    "font-mono font-medium cursor-pointer",
    "transition-colors duration-150",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  variants: {
    variant: {
      primary: [
        "bg-accent-green text-bg-page",
        "enabled:hover:bg-green-primary",
        "enabled:active:bg-accent-green/80",
      ],
      secondary: [
        "bg-transparent text-text-primary",
        "border border-border-primary",
        "enabled:hover:bg-bg-elevated",
        "enabled:active:bg-bg-surface",
      ],
      ghost: [
        "bg-transparent text-text-secondary",
        "border border-border-primary",
        "enabled:hover:text-text-primary",
        "enabled:hover:bg-bg-elevated",
        "enabled:active:bg-bg-surface",
      ],
      danger: [
        "bg-accent-red text-white",
        "enabled:hover:bg-destructive",
        "enabled:active:bg-accent-red/80",
      ],
    },
    size: {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-xs",
      lg: "px-6 py-2.5 text-[13px]",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

type ButtonVariants = VariantProps<typeof button>;
type ButtonProps = ComponentProps<"button"> & ButtonVariants;

function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={button({ variant, size, className })} {...props} />;
}

export { Button, button, type ButtonProps, type ButtonVariants };
```

### Component Composition
- Favor composition over inheritance.
- Use the `children` prop for flexible content.
- **Wrap Headless UI Components**: When using components from a headless UI library (e.g., `@base-ui/react`), create a wrapper component in `/src/components/ui`. This wrapper should apply project-specific styling using `tailwind-variants` and ensure all state and event props are correctly passed through. For a detailed guide and reference implementation, see the "Advanced Component Patterns" section in `src/components/ui/AGENTS.md`.
- Accept `className` and style props for customization.
- Forward `ref`s when imperative handle access is needed.
- Provide sensible defaults for all props.

### Performance Considerations
- Use `React.memo` for components that render frequently with same props
- Memoize expensive calculations with `useMemo`
- Use `useCallback` for event handlers passed as props
- Lazy load heavy components with `next/dynamic` when appropriate
- Optimize images with Next.js Image component
- Minimize client-side JavaScript; favor server components when possible

## State Management

### Local State
- Use `useState` for simple local state
- Use `useReducer` for complex state logic
- Prefer updating state with functional updates when based on previous state
- Derive state when possible instead of storing redundant information

### Server State
- Use Next.js built-in data fetching methods:
  - `fetch()` in server components or route handlers
  - `revalidateTag` and `revalidatePath` for cache invalidation
- Avoid client-side data fetching when data is available at build/request time
- Implement proper loading and error states

### Client State Libraries
Currently no global state management library is used (like Redux or Zustand). For complex state needs:
1. First consider if URL state or server state can solve the problem
2. Evaluate if React Context with useReducer is sufficient
3. Only introduce external libraries when absolutely necessary
4. Follow the same patterns as existing code if adding new libraries

### Form Handling
- Use controlled components for form inputs
- Validate on both client and server
- Use HTML5 validation attributes when possible
- Handle form submission with proper error states
- Consider using libraries like React Hook Form for complex forms

## Performance Optimization

### Rendering Optimization
- Leverage React 19's concurrent features when appropriate
- Use server components for data-heavy or static content
- Minimize client-side JavaScript bundle size
- Implement proper code splitting with dynamic imports
- Use `loading.js` and `error.js` files for routing boundaries

### Bundle Optimization
- Analyze bundle with `next build` and inspect `.next` directory
- Avoid large dependencies; prefer smaller alternatives
- Use dynamic imports for non-critical components
- Prefer native browser APIs over large libraries when possible
- Optimize images with Next.js Image component (automatic optimization, lazy loading)

### Runtime Performance
- Minimize layout thrashing; read/write DOM in batches
- Use requestAnimationFrame for animations
- Implement virtual scrolling for large lists
- Debounce expensive input handlers (search, resize)
- Use IntersectionObserver for scroll-based triggers
- Cache expensive computations with useMemo

### Next.js Specific Optimizations
- Use `export const dynamic = 'force-static'` for static pages when possible
- Implement proper caching headers in route handlers
- Use `revalidateTag` for granular cache invalidation
- Leverage incremental static regeneration (ISR) for frequently updated content
- Optimize font loading with `next/font`
- Use `next/script` for third-party scripts with proper loading strategies

## Testing Guidelines

### Testing Philosophy
The project currently does not have a testing framework configured. When adding tests:
1. Prioritize testing complex business logic over simple UI interactions
2. Test user behavior, not implementation details
3. Use mocks sparingly and only for external dependencies
4. Ensure tests are deterministic and fast
5. Write tests that give confidence when refactoring

### Recommended Testing Stack
If adding tests in the future, consider:
- **Vitest** or **Jest** for unit testing
- **React Testing Library** for component testing
- **Playwright** or **Cypress** for end-to-end testing
- **MSW** (Mock Service Worker) for API mocking

### Test File Organization
- Place tests alongside the files they test: `component.test.tsx`
- Or group in `__tests__` directory with matching structure
- Use descriptive test names that describe the behavior being tested
- Group related tests with `describe` blocks
- Use `beforeEach`, `afterEach` for setup/teardown

## Git Workflow

### Branching Strategy
- **main**: Production-ready code (always deployable)
- **develop**: Integration branch for features (optional, depends on team size)
- **feature/***: New feature branches
- **fix/***: Bug fix branches
- **release/***: Release preparation branches
- **hotfix/***: Urgent production fixes

### Commit Messages
Use conventional commits format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semi-colons, etc.
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Build process, tooling changes

Examples:
- `feat(button): add loading state to Button component`
- `fix(ui): resolve contrast issue in ghost variant`
- `docs: update component creation guidelines`
- `refactor(tailwind): migrate to CSS variables for theme colors`

### Pull Request Process
1. Create branch from main/develop
2. Make small, focused commits
3. Ensure code passes linting: `pnpm lint`
4. Format code: `pnpm format`
5. Build successfully: `pnpm build`
6. Test functionality manually
7. Open PR with clear description
8. Request review from team members
9. Address feedback and push updates
10. Squash and merge upon approval

### Release Process
1. Ensure main branch is green (all checks pass)
2. Create release branch from main
3. Update version in package.json (semantic versioning)
4. Add changelog entry
5. Build production bundle: `pnpm build`
6. Test production build locally: `pnpm start`
7. Tag release: `git tag v1.0.0`
8. Push tags: `git push --tags`
9. Deploy to production
10. Merge release branch back to main and develop

## Deployment

### Deployment Targets
The project can be deployed to:
- Vercel (recommended for Next.js)
- AWS (ECS, Lambda, Amplify)
- Azure App Service
- Google Cloud Run
- Docker containers
- Traditional Node.js hosting

### Deployment Process
1. Ensure code is on main branch and passes all checks
2. Run production build: `pnpm build`
3. Verify build output in `.next` directory
4. Configure environment variables on hosting platform
5. Start production server: `pnpm start`
6. Set up process manager (PM2, Docker, systemd) for production
7. Configure monitoring and logging
8. Set up health checks and alerting

### Environment Configuration
Different environments should have:
- **Development**: Local development with hot reloading
- **Staging**: Production-like environment for testing
- **Production**: Live user-facing environment

Each environment should have appropriate:
- Database connections
- API endpoints
- Feature flags
- Logging levels
- Error reporting settings

## Troubleshooting

### Common Development Issues

#### Turbopack Persistence Errors
If seeing errors like:
```
Persisting failed: Unable to write SST file
Allocation error : not enough memory
```

Solutions:
1. Clear Next.js cache: `rm -rf .next`
2. Free up system memory
3. Disable Turbopack: `pnpm dev --turbopack=false`
4. Check disk space and permissions
5. Restart development server

#### Module Not Found Errors
1. Verify import paths are correct
2. Check that dependencies are installed: `pnpm ls <package-name>`
3. Ensure TypeScript paths are configured correctly in tsconfig.json
4. Restart TypeScript server in IDE (if applicable)

#### Tailwind CSS Not Applying
1. Verify `@import "tailwindcss";` is in globals.css
2. Check that Tailwind v4 is installed: `pnpm ls tailwindcss`
3. Ensure postcss.config.mjs includes `@tailwindcss/postcss`
4. Verify browser cache is cleared (hard refresh)
5. Check for CSS syntax errors in globals.css

#### TypeScript Errors
1. Run TypeScript compiler directly: `npx tsc --noEmit`
2. Check for missing type definitions: `pnpm ls -D @types/<package>`
3. Ensure strict mode is not causing false positives
4. Verify tsconfig.json extends Next.js defaults correctly
5. Use type annotations to help compiler when needed

#### Linting Errors (Biome)
1. Run linter with fixes: `pnpm lint --write`
2. Check biome.json configuration for rule conflicts
3. Ensure editor is configured to use Biome for formatting
4. Verify file is included in linting scope
5. Temporarily disable specific rules if false positive (add TODO comment)

### Performance Issues
1. **Slow Development Start**:
   - Clear cache: `rm -rf .next`
   - Increase memory allocation for Node.js
   - Disable unnecessary browser extensions
   - Use `pnpm dev --turbo=false` if needed

2. **Slow Production Build**:
   - Analyze bundle with next build output
   - Remove unused dependencies
   - Implement code splitting for large libraries
   - Optimize images and assets
   - Consider using SWC instead of Babel if applicable

3. **Runtime Performance**:
   - Use React DevTools Profiler to identify bottlenecks
   - Check for unnecessary re-renders with React DevTools
   - Profile API response times
   - Monitor memory usage with browser dev tools
   - Check for memory leaks in long-running sessions

### Getting Help
1. Check Next.js documentation: https://nextjs.org/docs
2. Review Tailwind CSS v4 migration guide
3. Consult TypeScript handbook for complex types
4. Search existing codebase for similar patterns
5. Ask team members in appropriate channels
6. Create minimal reproducible example for bug reports
7. Check GitHub issues for known problems
8. Consult Biome documentation for linting rules

## Appendix: Useful Commands

### Package Management
```bash
# Install dependency
pnpm add <package-name>

# Install dev dependency
pnpm add -D <package-name>

# Remove package
pnpm remove <package-name>

# Update packages
pnpm update

# List outdated packages
pnpm outdated

# Check for unused packages
pnpm ls --unused
```

### Development
```bash
# Start dev server
pnpm dev

# Start dev server with specific port
pnpm dev --port 3001

# Start dev server without Turbopack
pnpm dev --turbopack=false

# Build for production
pnpm build

# Start production server
pnpm start

# Preview production build locally
pnpm build && pnpm start

# Clear Next.js cache
rm -rf .next

# Run type checker
pnpm dlx tsc --noEmit

# Run linter
pnpm lint

# Run linter with auto-fix
pnpm lint --write

# Format code
pnpm format

# Run all checks
pnpm check
```

### Debugging
```bash
# Enable verbose logging for Next.js
NEXT_DEBUG=1 pnpm dev

# Enable Turbopack logging
TURBOPACK_LOG=info pnpm dev

# Profile React DevTools
# Install React DevTools browser extension
# Use "Profiler" tab to identify performance bottlenecks

# Check bundle size
npx next-bundle-analyzer

# Analyze Webpack bundle
npx webpack-bundle-analyzer .next/static/chunks/*.js
```