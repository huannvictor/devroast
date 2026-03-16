"use client";

import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const leaderboardRow = tv({
  slots: {
    root: "flex w-full items-center gap-5 px-5 py-4",
    rank: "w-12.5 shrink-0 font-mono text-13 text-text-tertiary",
    score: "w-17.5 shrink-0 font-mono text-13 font-bold",
    code: "flex-1 truncate font-mono text-xs text-text-secondary",
    lang: "w-25 shrink-0 font-mono text-xs text-text-tertiary",
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

type LeaderboardRowRootProps = ComponentProps<"div"> &
  VariantProps<typeof leaderboardRow>;

function LeaderboardRowRoot({ className, ...props }: LeaderboardRowRootProps) {
  const { root } = leaderboardRow();
  return <div className={root({ className })} {...props} />;
}

type LeaderboardRowRankProps = ComponentProps<"div"> & { value: number };

function LeaderboardRowRank({
  className,
  value,
  ...props
}: LeaderboardRowRankProps) {
  const { rank } = leaderboardRow();
  return (
    <div className={rank({ className })} {...props}>
      #{value}
    </div>
  );
}

type LeaderboardRowScoreProps = ComponentProps<"div"> & { value: number };

function LeaderboardRowScore({
  className,
  value,
  ...props
}: LeaderboardRowScoreProps) {
  const scoreVariant = value >= 8 ? "good" : value >= 4 ? "medium" : "bad";
  const { score } = leaderboardRow({ scoreVariant });
  return (
    <div className={score({ className })} {...props}>
      {value.toFixed(1)}
    </div>
  );
}

type LeaderboardRowCodeProps = ComponentProps<"div">;

function LeaderboardRowCode({
  className,
  children,
  ...props
}: LeaderboardRowCodeProps) {
  const { code } = leaderboardRow();
  return (
    <div className={code({ className })} {...props}>
      {children}
    </div>
  );
}

type LeaderboardRowLangProps = ComponentProps<"div">;

function LeaderboardRowLang({
  className,
  children,
  ...props
}: LeaderboardRowLangProps) {
  const { lang } = leaderboardRow();
  return (
    <div className={lang({ className })} {...props}>
      {children}
    </div>
  );
}

export {
  LeaderboardRowCode,
  LeaderboardRowLang,
  LeaderboardRowRank,
  LeaderboardRowRoot as LeaderboardRow,
  LeaderboardRowRoot,
  LeaderboardRowScore,
  leaderboardRow,
};
