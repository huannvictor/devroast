# Devroast: Agent Guidelines

## Tech Stack
- **Framework**: Next.js 16 (App Router), React 19.
- **Styling**: Tailwind CSS v4, `tailwind-variants`, `tailwind-merge`.
- **Quality**: TypeScript (Strict), Biome (Lint/Format).
- **Manager**: pnpm (Mandatory).

## Core Mandates
- **Design Source**: Always follow `devroast.pen`. Implementations must match the design exactly.
- **UI Components**: Use the **TV Pattern** (`tailwind-variants`) in `src/components/ui`.
- **Architecture**: Business logic in App Router, pure primitives in `src/components/ui`.
- **Commits**: Conventional Commits only.

## Essential Commands
- `pnpm dev`: Start development server.
- `pnpm check`: Run Biome linting and formatting.
- `pnpm build`: Production build.
