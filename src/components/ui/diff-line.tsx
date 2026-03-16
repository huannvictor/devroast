"use client";

import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const diffLine = tv({
  slots: {
    base: "flex w-full items-center gap-2 px-4 py-1 font-mono text-13",
    prefix: "w-4 text-center",
    content: "flex-1 whitespace-pre",
  },
  variants: {
    variant: {
      added: {
        base: "bg-diff-added",
        prefix: "text-accent-green",
        content: "text-text-primary",
      },
      removed: {
        base: "bg-diff-removed",
        prefix: "text-accent-red",
        content: "text-text-secondary",
      },
      context: {
        prefix: "text-text-tertiary",
        content: "text-text-secondary",
      },
    },
  },
  defaultVariants: {
    variant: "context",
  },
});

type DiffLineProps = ComponentProps<"div"> &
  VariantProps<typeof diffLine> & {
    children: string;
  };

function DiffLine({ className, variant, children, ...props }: DiffLineProps) {
  const { base, prefix, content } = diffLine({ variant });

  const prefixSymbol =
    variant === "added" ? "+" : variant === "removed" ? "-" : " ";

  return (
    <div className={base({ className })} {...props}>
      <span className={prefix()}>{prefixSymbol}</span>
      <code className={content()}>{children}</code>
    </div>
  );
}

export { DiffLine, type DiffLineProps, diffLine };
