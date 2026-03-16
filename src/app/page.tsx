"use client";

import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import {
  LeaderboardRow,
  LeaderboardRowCode,
  LeaderboardRowLang,
  LeaderboardRowRank,
  LeaderboardRowScore,
} from "@/components/ui/leaderboard-row";
import { Toggle } from "@/components/ui/toggle";

export default function Home() {
  const [code, setCode] = useState("");
  const [isRoastMode, setIsRoastMode] = useState(true);

  return (
    <main className="flex w-full flex-col items-center gap-8 bg-bg-page px-10 pt-20 pb-20">
      {/* Hero Title (Gk6x1) */}
      <section className="flex flex-col items-center gap-3 text-center">
        <h1 className="flex items-center gap-3 font-mono text-4xl font-bold text-text-primary">
          <span className="text-accent-green">{"$"}</span>
          paste your code. get roasted.
        </h1>
        <p className="font-mono text-sm text-text-secondary">
          {
            "// drop your code below and we'll rate it — brutally honest or full roast mode"
          }
        </p>
      </section>

      {/* Code Input (7jSCO) */}
      <div className="flex w-full max-w-195 flex-col gap-8">
        <div className="flex h-90 w-full flex-col overflow-hidden rounded-md border border-border-primary bg-bg-input shadow-xl">
          <div className="flex h-10 items-center gap-3 border-b border-border-primary px-4">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-accent-red" />
              <div className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
              <div className="h-2.5 w-2.5 rounded-full bg-accent-green" />
            </div>
            <span className="font-mono text-xs text-text-tertiary">
              new_code.js
            </span>
          </div>
          <textarea
            className="h-full w-full resize-none bg-transparent p-4 font-mono text-13 leading-6 text-text-primary outline-none placeholder:text-text-tertiary"
            placeholder="paste your shameful code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        {/* Actions Bar (CN3U8) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Toggle pressed={isRoastMode} onPressedChange={setIsRoastMode} />
              <span
                className={twMerge(
                  "font-mono text-xs transition-colors",
                  isRoastMode ? "text-accent-green" : "text-text-secondary",
                )}
              >
                roast mode
              </span>
            </div>
          </div>
          <Button variant="primary" size="lg" disabled={!code.trim()}>
            $ roast_my_code
          </Button>
        </div>
      </div>

      {/* Footer Hint (e1iw1) */}
      <div className="flex items-center gap-4 font-mono text-xs text-text-tertiary">
        <span>2,847 codes roasted</span>
        <span>·</span>
        <span>avg score: 4.2/10</span>
      </div>

      <div className="h-15" />

      {/* Leaderboard Preview (luohW) */}
      <section className="flex w-full max-w-240 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="flex items-center gap-2 font-mono text-sm font-bold text-text-primary">
            <span className="text-accent-green">{"//"}</span>
            shame_leaderboard
          </h2>
          <p className="font-mono text-13 text-text-tertiary">
            {"// the worst code on the internet, ranked by shame"}
          </p>
        </div>

        {/* Leaderboard Table (Qiytz) */}
        <div className="overflow-hidden rounded-md border border-border-primary">
          {/* Table Header (unU92) */}
          <div className="flex w-full items-center gap-5 border-b border-border-primary bg-bg-surface px-5 py-2.5">
            <div className="w-12.5 shrink-0 font-mono text-xs font-medium text-text-tertiary">
              #
            </div>
            <div className="w-17.5 shrink-0 font-mono text-xs font-medium text-text-tertiary">
              score
            </div>
            <div className="flex-1 font-mono text-xs font-medium text-text-tertiary">
              code
            </div>
            <div className="w-25 shrink-0 font-mono text-xs font-medium text-text-tertiary">
              lang
            </div>
          </div>

          <LeaderboardRow>
            <LeaderboardRowRank value={1} />
            <LeaderboardRowScore value={1.2} />
            <LeaderboardRowCode>
              {
                "function check(a) { if(a == true) return true; else return false; }"
              }
            </LeaderboardRowCode>
            <LeaderboardRowLang>javascript</LeaderboardRowLang>
          </LeaderboardRow>
          <LeaderboardRow className="border-t border-border-primary">
            <LeaderboardRowRank value={2} />
            <LeaderboardRowScore value={1.5} />
            <LeaderboardRowCode>
              {"var x = eval('user_input'); console.log(x);"}
            </LeaderboardRowCode>
            <LeaderboardRowLang>javascript</LeaderboardRowLang>
          </LeaderboardRow>
          <LeaderboardRow className="border-t border-border-primary">
            <LeaderboardRowRank value={3} />
            <LeaderboardRowScore value={2.1} />
            <LeaderboardRowCode>
              {"try { doSomething(); } catch(e) { /* ignore */ }"}
            </LeaderboardRowCode>
            <LeaderboardRowLang>javascript</LeaderboardRowLang>
          </LeaderboardRow>
        </div>

        {/* Fade Hint (4StXm) */}
        <div className="flex flex-col items-center gap-4 py-4">
          <p className="font-mono text-xs text-text-tertiary">
            showing top 3 of 2,847 ·{" "}
            <Link
              href="/leaderboard"
              className="hover:text-text-secondary transition-colors underline underline-offset-4"
            >
              view full leaderboard &gt;&gt;
            </Link>
          </p>
        </div>
      </section>

      <div className="h-15" />
    </main>
  );
}
