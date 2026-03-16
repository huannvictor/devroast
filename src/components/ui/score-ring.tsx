"use client";

import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const scoreRing = tv({
  slots: {
    base: "relative flex items-center justify-center rounded-full",
    hole: "absolute bg-bg-page rounded-full",
    textWrapper:
      "absolute flex flex-col items-center justify-center text-center",
    scoreText: "font-mono font-bold leading-none",
    scoreLabel: "font-mono text-xs text-text-tertiary leading-none",
  },
  variants: {
    size: {
      sm: {
        base: "size-16",
        scoreText: "text-xl",
      },
      md: {
        base: "size-24",
        scoreText: "text-3xl",
      },
      lg: {
        base: "size-36",
        scoreText: "text-5xl",
      },
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

type ScoreRingProps = ComponentProps<"div"> &
  VariantProps<typeof scoreRing> & {
    value: number;
    size?: "sm" | "md" | "lg";
    strokeWidth?: number;
    label?: string;
  };

function ScoreRing({
  value,
  size = "lg",
  strokeWidth = 4,
  label = "/100",
  className,
  ...props
}: ScoreRingProps) {
  const { base, hole, textWrapper, scoreText, scoreLabel } = scoreRing({
    size,
  });

  const gradientStyle = {
    background: `conic-gradient(from -90deg, var(--color-accent-green), var(--color-accent-amber) ${value}%, var(--color-border-primary) ${value}%)`,
  };

  const holeStyle = {
    width: `calc(100% - ${strokeWidth * 2}px)`,
    height: `calc(100% - ${strokeWidth * 2}px)`,
  };

  return (
    <div className={base({ className })} style={gradientStyle} {...props}>
      <div className={hole()} style={holeStyle} />
      <div className={textWrapper()}>
        <span className={scoreText()}>{value}</span>
        {label && <span className={scoreLabel()}>{label}</span>}
      </div>
    </div>
  );
}

export { ScoreRing, type ScoreRingProps, scoreRing };
