# UI Component Creation Pattern

This document outlines the standard pattern for creating UI components in the `src/components/ui` directory. All new components should follow this pattern to ensure consistency, maintainability, and proper theming integration.

**Important**: The definitive design reference for all UI components is the `.pen` file located in the project parent directory (`C:\Users\huann\dev\NLW_operator\devroast.pen`). All developers must always consult this file for exact design specifications, including dimensions, colors, spacing, and component layouts before implementing any UI changes.

## Package Management

**Always use pnpm for package management.** Never use npm or yarn.

To install dependencies:
```bash
pnpm add <package-name>
```

## Component Structure

Each UI component should follow this structure:

### File Location
`src/components/ui/<ComponentName>.tsx`

### Implementation Pattern
```typescript
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const <componentName> = tv({
  base: [
    // Base classes applied to all variants
  ],
  variants: {
    variant: {
      // Variant definitions
    },
    size: {
      // Size definitions
    },
    // Add other variant groups as needed (e.g., radius, position)
  },
  defaultVariants: {
    variant: "<default-variant>",
    size: "<default-size>",
    // Set other default variants as needed
  },
});

type <ComponentName>Variants = VariantProps<typeof <componentName>>;

type <ComponentName>Props = ComponentProps<"underlying-element"> & <ComponentName>Variants;

function <ComponentName>({ variant, size, className, ...props }: <ComponentName>Props) {
  return <underlying-element className={<componentName>({ variant, size, className })} {...props} />;
}

export { <ComponentName>, <componentName>, type <ComponentName>Props, type <ComponentName>Variants };
```

### Key Requirements

1. **Type Safety**: Always extend native HTML element props using `ComponentProps<"element-type">`
2. **Named Exports Only**: Never use default exports
3. **Tailwind Variants**: Use `tailwind-variants` for variant management
4. **No twMerge**: The `tv` function handles class merging internally
5. **Consistent Namening**: 
   - Component function: PascalCase (e.g., `Button`)
   - TV function: camelCase (e.g., `button`)
   - Types: Follow component naming (e.g., `ButtonProps`, `ButtonVariants`)

### Styling Guidelines

1. **Theme Variables**: Use CSS variables defined in `src/app/globals.css`:
   - Colors: `var(--color-accent-green)`, `var(--color-text-primary)`, etc.
   - Fonts: `var(--font-mono)`, `var(--font-sans)`
   - Spacing: Use Tailwind spacing scale or CSS variables
   - Radii: Use `--radius-none`, `--radius-m`, `--radius-pill`

2. **Dark Mode Support**: Ensure components work in both light and dark modes by using appropriate theme variables

3. **Accessibility**: Follow WCAG guidelines, ensure proper contrast ratios

### Button Component Reference

The `Button` component in this directory follows this exact pattern. Refer to `button.tsx` for a complete implementation example.

## Advanced Component Patterns

Beyond the basic structure, several patterns have been established for more complex components.

### 1. Conditional Class Merging with `twMerge`

While the `tv` function handles merging classes passed to it, you should use the `twMerge` utility for any conditional class logic outside of `tv` (e.g., in page components). This is safer than string interpolation.

**Incorrect (unsafe):**
```jsx
<span className={`base-class ${isActive ? "active-class" : "inactive-class"}`}>
  ...
</span>
```

**Correct (safe):**
```jsx
import { twMerge } from "tailwind-merge";

<span className={twMerge("base-class", isActive ? "active-class" : "inactive-class")}>
  ...
</span>
```

### 2. Wrapping Headless UI Components

When a component from a headless UI library (like `@base-ui/react`) is used, it should be wrapped to integrate with the project's styling and standards. The `Toggle` component is the reference for this pattern.

**Key Steps:**
1.  **Import and Alias**: Import the base component and alias it to avoid naming conflicts.
    ```typescript
    import { Toggle as BaseToggle, type ToggleState } from "@base-ui/react/toggle";
    ```
2.  **Define Styles with `tv`**: Use `data-[state=on/off]` selectors in `tailwind-variants` to style the component based on its state, which the headless library should expose via data attributes.
    ```typescript
    const toggle = tv({
      slots: {
        track: "data-[state=on]:bg-accent-green data-[state=off]:bg-border-primary",
        thumb: "group-data-[state=on]:translate-x-[18px]",
      },
    });
    ```
3.  **Extend Props**: The wrapper's props should extend the base component's props to ensure full compatibility.
    ```typescript
    type ToggleProps = ComponentProps<typeof BaseToggle>;
    ```
4.  **Pass Through Props and State**:
    -   All relevant props, especially state controllers like `pressed`, must be passed down to the base component.
    -   Manually add the `data-state` attribute to the base component to ensure styles are applied correctly.
    -   If the base component uses a function for its `className` prop, resolve the parent classes within that function before merging.
**`Toggle.tsx` Reference Implementation:**
```typescript
function Toggle({ className, pressed, ...props }: ToggleProps) {
  const { track, thumb } = toggle();

  return (
    <BaseToggle
      className={(state: ToggleState) => {
        const parentClasses = typeof className === "function" ? className(state) : className;
        return track({ className: parentClasses });
      }}
      data-state={pressed ? "on" : "off"}
      pressed={pressed}
      {...props}
    >
      <span className={thumb()} />
    </BaseToggle>
  );
}
```

### 3. Complex Visuals (SVG & CSS Gradients)

For complex visuals not achievable with standard Tailwind classes (like the angular gradient in the `ScoreRing`), it is acceptable to use inline `style` attributes. This logic should be self-contained within the component.

**`ScoreRing.tsx` Example:**
```typescript
function ScoreRing({ value, ... }: ScoreRingProps) {
  const gradientStyle = {
    background: `conic-gradient(from -90deg, var(--color-accent-green), var(--color-accent-amber) ${value}%, var(--color-border-primary) ${value}%)`,
  };

  return (
    <div style={gradientStyle} {...props}>
      {/* ... rest of component ... */}
    </div>
  );
}
```

### Adding New Components

When creating a new component:
1. Create the file: `src/components/ui/<ComponentName>.tsx`
2. Follow the pattern above
3. Add any necessary dependencies using pnpm
4. Update the component showcase page (see src/app/)
5. Ensure proper TypeScript typing
6. Test in both light and dark modes

### Example: Button Component

See `button.tsx` for the reference implementation showing:
- Proper import statements
- TV configuration with base, variants, and defaultVariants
- Type definitions using VariantProps and ComponentProps
- Function component implementation
- Named exports

### Toggle Component

#### Import and Render Basic React Toggle Component

Source: https://base-ui.com/react/components/toggle

This snippet shows the basic import and rendering of the `Toggle` component from `@base-ui/react/toggle`. It illustrates the minimal setup required to use the component in a React application.

```jsx
import { Toggle } from '@base-ui/react/toggle';

<Toggle />;
```

#### api-reference

Use the API reference to understand the component: https://base-ui.com/react/components/toggle#api-reference
