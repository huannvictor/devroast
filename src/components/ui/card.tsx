import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const card = tv({
  slots: {
    root: [
      "rounded-md",
      "border",
      "border-border-primary",
      "bg-bg-surface",
      "flex",
      "flex-col",
    ],
    header: ["mb-3", "flex", "flex-col", "gap-2"],
    title: ["font-mono", "text-15", "font-bold", "text-text-primary"],
    description: [
      "font-mono",
      "text-xs",
      "leading-relaxed",
      "text-text-secondary",
    ],
    content: ["space-y-3"],
    footer: ["mt-3", "flex", "items-center"],
  },
  variants: {
    variant: {
      default: { root: [] },
      elevated: { root: ["bg-bg-elevated", "shadow-md"] },
    },
    size: {
      sm: { root: "p-3" },
      md: { root: "p-4" },
      lg: { root: "p-6" },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type CardRootProps = ComponentProps<"div"> & VariantProps<typeof card>;

function CardRoot({ className, variant, size, ...props }: CardRootProps) {
  const { root } = card({ variant, size });
  return <div className={root({ className })} {...props} />;
}

type CardHeaderProps = ComponentProps<"div">;

function CardHeader({ className, ...props }: CardHeaderProps) {
  const { header } = card();
  return <div className={header({ className })} {...props} />;
}

type CardTitleProps = ComponentProps<"h3">;

function CardTitle({ className, ...props }: CardTitleProps) {
  const { title } = card();
  return <h3 className={title({ className })} {...props} />;
}

type CardDescriptionProps = ComponentProps<"p">;

function CardDescription({ className, ...props }: CardDescriptionProps) {
  const { description } = card();
  return <p className={description({ className })} {...props} />;
}

type CardContentProps = ComponentProps<"div">;

function CardContent({ className, ...props }: CardContentProps) {
  const { content } = card();
  return <div className={content({ className })} {...props} />;
}

type CardFooterProps = ComponentProps<"div">;

function CardFooter({ className, ...props }: CardFooterProps) {
  const { footer } = card();
  return <div className={footer({ className })} {...props} />;
}

export {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot as Card,
  CardRoot,
  type CardRootProps,
  CardTitle,
  card,
};
