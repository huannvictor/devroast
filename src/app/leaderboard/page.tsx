"use client";

import { LeaderboardRow } from "@/components/ui/leaderboard-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockLeaderboard = [
  {
    rank: 1,
    score: 1.2,
    code: "function check(a) { if(a == true) return true; else return false; }",
    lang: "javascript",
  },
  {
    rank: 2,
    score: 1.5,
    code: "var x = eval('user_input'); console.log(x);",
    lang: "javascript",
  },
  {
    rank: 3,
    score: 2.1,
    code: "try { doSomething(); } catch(e) { /* ignore */ }",
    lang: "javascript",
  },
  {
    rank: 4,
    score: 2.4,
    code: "document.getElementById('btn').onclick = function() { alert('Clicked!'); }",
    lang: "javascript",
  },
  {
    rank: 5,
    score: 2.8,
    code: "for(var i=0; i<arr.length; i++) { setTimeout(function() { console.log(i); }, 100); }",
    lang: "javascript",
  },
  {
    rank: 6,
    score: 3.2,
    code: "if(!!(!!(!!true))) { return true; }",
    lang: "javascript",
  },
];

export default function LeaderboardPage() {
  return (
    <main className="flex w-full flex-col items-center gap-10 bg-bg-page px-10 py-20">
      <section className="flex w-full max-w-[960px] flex-col gap-10">
        {/* Hero Section (4tysx) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold text-accent-green">
              {">"}
            </span>
            <h1 className="font-mono text-3xl font-bold text-text-primary">
              shame_leaderboard
            </h1>
          </div>
          <p className="font-mono text-lg text-text-secondary leading-relaxed">
            {"// the most roasted code on the internet, ranked by pure shame"}
          </p>
          <div className="flex gap-4">
            <Badge variant="critical">Avg. Shame: 3.4/10</Badge>
            <Badge variant="warning">Most Roasted: JavaScript</Badge>
          </div>
        </div>

        {/* Leaderboard Entries (w89x6) */}
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-md border border-border-primary">
            {mockLeaderboard.map((entry) => (
              <LeaderboardRow
                key={entry.rank}
                rank={entry.rank}
                score={entry.score}
                code={entry.code}
                lang={entry.lang}
                className="hover:bg-bg-surface/50 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Link href="/">
            <Button variant="primary">
              $ roast_my_own_code
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
