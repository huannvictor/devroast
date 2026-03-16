# Devroast Project Development Guidelines

This document outlines the core standards and architectural patterns for Devroast.

## 🚀 Project Overview

Devroast is a Next.js 16 application built with React 19, featuring a custom UI library styled with Tailwind CSS v4.

- **Package Manager**: `pnpm` (Mandatory).
- **Code Quality**: Biome (Linter/Formatter), TypeScript (Strict).
- **Design Source**: The definitive reference is `devroast.pen`. Consult it for all exact dimensions, colors, and layouts.

## 📂 Architecture & Structure

```text
/src
├── /app               # Next.js App Router (Routes & Layouts)
├── /components        # Reusable components
│   └── /ui            # Atomic UI primitives (Button, Card, etc.)
├── /public            # Static assets
└── biome.json         # Project standards
```

## 🛠️ Coding Standards

### 1. Naming & Organization

- **Components**: `PascalCase.tsx` (e.g., `ScoreRing.tsx`).
- **Utilities/Hooks**: `kebab-case.ts` (e.g., `use-roast.ts`).
- **Files**: Keep under 200 lines; colocate logic where it makes sense.

### 2. UI Component Pattern (TV Pattern)

All primitive components in `src/components/ui` **must** use `tailwind-variants`:

```typescript
const component = tv({
  base: "...",
  variants: { ... },
  defaultVariants: { ... }
});
```

### 3. Styling & Design Tokens

- Use Tailwind v4 `@theme` variables (e.g., `bg-bg-page`, `text-text-primary`).
- Avoid hardcoded values; always refer to the design tokens in `globals.css`.
- Use `twMerge` for conditional classes outside of `tv` definitions.

### 4. TypeScript Guidelines

- **Strict Mode**: `noImplicitAny`, `strictNullChecks` are enforced.
- **Props**: Extend native HTML props using `ComponentProps<"element">`.

## 🔄 Workflow

- **Commits**: Use **Conventional Commits** (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`).
- **Development**:
  - `pnpm dev`: Start development.
  - `pnpm check`: Lint and format check.
  - `pnpm build`: Validate production build.

## ⚠️ Troubleshooting

- **Turbopack Errors**: Clear cache with `rm -rf .next`.
- **Styling Issues**: Ensure `@import "tailwindcss";` is present and Biome is not conflicting with Tailwind classes.
