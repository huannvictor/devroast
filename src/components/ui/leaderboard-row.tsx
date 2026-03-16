"use client";

import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const leaderboardRow = tv({
  slots: {
    base: "flex w-full items-center gap-6 border-b border-border-primary px-5 py-4",
    rank: "w-10 font-mono text-[13px] text-text-tertiary",
    score: "w-16 font-mono text-[13px] font-bold",
    code: "flex-1 truncate font-mono text-xs text-text-secondary",
    lang: "w-24 font-mono text-xs text-text-tertiary",
  },
  variants: {
    scoreVariant: {
      good: {
        score: "text-accent-green",
      },
      medium: {
        score: "text-accent-amber",
      },
      bad: {
        score: "text-accent-red",
      },
    },
  },
});

type LeaderboardRowProps = ComponentProps<"div"> &
  VariantProps<typeof leaderboardRow> & {
    rank: number;
    score: number;
    code: string;
    lang: string;
  };

function LeaderboardRow({
  className,
  rank,
  score,
  code,
  lang,
  ...props
}: LeaderboardRowProps) {
  const scoreVariant =
    score >= 8 ? "good" : score >= 4 ? "medium" : "bad";
  const {
    base,
    rank: rankSlot,
    score: scoreSlot,
    code: codeSlot,
    lang: langSlot,
  } = leaderboardRow({ scoreVariant });

  return (
    <div className={base({ className })} {...props}>
      <div className={rankSlot()}>#{rank}</div>
      <div className={scoreSlot()}>{score.toFixed(1)}</div>
      <div className={codeSlot()}>{code}</div>
      <div className={langSlot()}>{lang}</div>
    </div>
  );
}

export { LeaderboardRow, type LeaderboardRowProps, leaderboardRow };
