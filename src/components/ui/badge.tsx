import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badge = tv({
  base: "inline-flex items-center gap-2 font-mono",
  variants: {
    variant: {
      critical: "text-accent-red",
      warning: "text-accent-amber",
      good: "text-accent-green",
      needsSeriousHelp: "text-accent-red font-medium",
    },
    size: {
      sm: "text-xs",
      md: "text-13",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    variant: "good",
    size: "md",
  },
});

const badgeDot = tv({
  base: "rounded-full",
  variants: {
    variant: {
      critical: "bg-accent-red",
      warning: "bg-accent-amber",
      good: "bg-accent-green",
      needsSeriousHelp: "bg-accent-red",
    },
    size: {
      sm: "size-1.5",
      md: "size-2",
      lg: "size-2.5",
    },
  },
  defaultVariants: {
    variant: "good",
    size: "md",
  },
});

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badge>;

function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <span className={badge({ variant, size, className })} {...props}>
      <div className={badgeDot({ variant, size })} />
      {children}
    </span>
  );
}

export { Badge, type BadgeProps, badge };
