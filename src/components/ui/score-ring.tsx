"use client";

import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const scoreRing = tv({
  slots: {
    base: "relative flex items-center justify-center rounded-full overflow-hidden",
    hole: "absolute bg-bg-page rounded-full z-10",
    textWrapper:
      "absolute flex flex-col items-center justify-center text-center z-20",
    scoreText: "font-mono font-bold leading-none",
    scoreLabel: "font-mono text-text-tertiary leading-none",
  },
  variants: {
    size: {
      sm: {
        base: "size-16",
        scoreText: "text-xl",
        scoreLabel: "text-[10px]",
      },
      md: {
        base: "size-24",
        scoreText: "text-3xl",
        scoreLabel: "text-xs",
      },
      lg: {
        base: "size-[180px]",
        scoreText: "text-[48px]",
        scoreLabel: "text-base",
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

  // Ensure value is between 0 and 100 for percentage logic
  const percentage = Math.min(Math.max(value, 0), 100);

  // Dynamic colors based on score thresholds from the design
  const getScoreColor = (v: number) => {
    if (v < 35) return "var(--color-accent-red)";
    if (v < 70) return "var(--color-accent-amber)";
    return "var(--color-accent-green)";
  };

  const activeColor = getScoreColor(percentage);

  // Conic gradient for the progress ring matching rKL79 stops
  // Note: CSS conic-gradient starts at top and goes clockwise by default
  const progressStyle = {
    background: `conic-gradient(
      from 0deg,
      var(--color-accent-red) 0%,
      var(--color-accent-amber) 35%,
      var(--color-accent-green) 35%,
      var(--color-accent-green) 100%
    )`,
    maskImage: `conic-gradient(#000 ${percentage}%, transparent ${percentage}%)`,
    WebkitMaskImage: `conic-gradient(#000 ${percentage}%, transparent ${percentage}%)`,
  };

  const holeStyle = {
    width: `calc(100% - ${strokeWidth * 2}px)`,
    height: `calc(100% - ${strokeWidth * 2}px)`,
  };

  // Format the display value: 
  // if label is /10, we show value/10 formatted (e.g. 3.5)
  // otherwise we show the raw value
  const displayValue = label === "/10" ? (value / 10).toFixed(1) : value;

  return (
    <div 
      className={base({ className })} 
      style={{ background: "var(--color-border-primary)" }}
      {...props}
    >
      {/* Background ring is the 'base' itself with border-primary background */}
      
      {/* The Progress Ring */}
      <div 
        className="absolute inset-0 rounded-full" 
        style={progressStyle}
      />
      
      {/* The Hole (to make it a ring) */}
      <div className={hole()} style={holeStyle} />
      
      {/* The Text and Label */}
      <div className={textWrapper()}>
        <span className={scoreText()} style={{ color: activeColor }}>
          {displayValue}
        </span>
        {label && <span className={scoreLabel()}>{label}</span>}
      </div>
    </div>
  );
}

export { ScoreRing, type ScoreRingProps, scoreRing };
