import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const card = tv({
  base: ["rounded-md", "border", "border-border-primary", "bg-bg-surface"],
  variants: {
    variant: {
      default: [],
      elevated: ["bg-bg-elevated", "shadow-md"],
    },
    size: {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type CardProps = ComponentProps<"div"> &
  VariantProps<typeof card> & {
    header?: React.ReactNode;
    footer?: React.ReactNode;
  };

function Card({
  className,
  variant,
  size,
  header,
  footer,
  children,
  ...props
}: CardProps) {
  return (
    <div className={card({ variant, size, className })} {...props}>
      {header && <div className="mb-3">{header}</div>}
      <div className="space-y-3">{children}</div>
      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
}

export { Card, type CardProps, card };

