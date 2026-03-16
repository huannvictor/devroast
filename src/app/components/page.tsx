"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockDots,
  CodeBlockFileName,
  CodeBlockHeader,
  CodeBlockLineNumbers,
} from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import {
  LeaderboardRow,
  LeaderboardRowCode,
  LeaderboardRowLang,
  LeaderboardRowRank,
  LeaderboardRowScore,
} from "@/components/ui/leaderboard-row";
import { ScoreRing } from "@/components/ui/score-ring";
import { Toggle } from "@/components/ui/toggle";

function ShowcaseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col gap-6">
      <h2 className="flex items-center gap-2 font-mono text-sm font-bold text-text-primary">
        <span className="text-accent-green">{/* // */}</span>
        {title}
      </h2>
      <div className="flex flex-col items-start gap-0">{children}</div>
    </section>
  );
}

export default function ComponentsShowcase() {
  const [isToggled, setIsToggled] = useState(false);
  const [isToggled2, setIsToggled2] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-start gap-15 bg-bg-page px-20 py-16 text-text-primary">
      <h1 className="flex items-center gap-2 font-mono text-2xl font-bold">
        <span className="text-accent-green">{/* // */}</span>
        component_library
      </h1>

      <ShowcaseSection title="buttons">
        <div className="flex items-center gap-4">
          <Button variant="primary">$ roast_my_code</Button>
          <Button variant="secondary">$ share_roast</Button>
          <Button variant="ghost">$ view_all &gt;&gt;</Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="toggle">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Toggle pressed={isToggled} onPressedChange={setIsToggled} />
            <span
              className={twMerge(
                "font-mono text-xs",
                isToggled ? "text-accent-green" : "text-text-secondary",
              )}
            >
              roast mode
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Toggle pressed={isToggled2} onPressedChange={setIsToggled2} />
            <span
              className={twMerge(
                "font-mono text-xs",
                isToggled2 ? "text-accent-green" : "text-text-secondary",
              )}
            >
              roast mode
            </span>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="badge_status">
        <div className="flex items-center gap-4">
          <Badge variant="critical">critical</Badge>
          <Badge variant="warning">warning</Badge>
          <Badge variant="good">good</Badge>
          <Badge variant="needsSeriousHelp">needs_serious_help</Badge>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="cards">
        <div className="flex items-center gap-4">
          <Card variant="elevated" size="md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent-red" />
                <span className="font-mono text-xs font-normal text-accent-red">
                  critical
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>using var instead of const/let</CardTitle>
              <CardDescription>
                the var keyword is function-scoped rather than block-scoped,
                which can lead to unexpected behavior and bugs. modern
                javascript uses const for immutable bindings and let for mutable
                ones.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="code_block">
        <div className="flex items-center gap-4">
          <CodeBlock>
            <CodeBlockHeader>
              <CodeBlockDots />
              <CodeBlockFileName>calculate.js</CodeBlockFileName>
            </CodeBlockHeader>
            <CodeBlockBody>
              <CodeBlockLineNumbers count={7} />
              <CodeBlockContent
                code={`function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i];
  }
  return total * 0.9; // Apply 10% discount
}`}
                language="javascript"
              />
            </CodeBlockBody>
          </CodeBlock>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="diff_lines">
        <DiffLine variant="removed">var total = 0;</DiffLine>
        <DiffLine variant="added">const total = 0;</DiffLine>
        <DiffLine variant="context">{`for (let i = 0; i < items.length; i++) {`}</DiffLine>
      </ShowcaseSection>

      <ShowcaseSection title="leaderboard_row">
        <LeaderboardRow>
          <LeaderboardRowRank value={1} />
          <LeaderboardRowScore value={2.1} />
          <LeaderboardRowCode>
            function calculateTotal(items) {"{ var total = 0; ..."}
          </LeaderboardRowCode>
          <LeaderboardRowLang>javascript</LeaderboardRowLang>
        </LeaderboardRow>
        <LeaderboardRow>
          <LeaderboardRowRank value={2} />
          <LeaderboardRowScore value={9.8} />
          <LeaderboardRowCode>
            function calculateTotal(items) {"{ const total = 0; ..."}
          </LeaderboardRowCode>
          <LeaderboardRowLang>typescript</LeaderboardRowLang>
        </LeaderboardRow>
      </ShowcaseSection>

      <ShowcaseSection title="score_ring">
        <div className="flex items-center gap-4">
          <ScoreRing value={35} label="/10" />
          <ScoreRing value={82} />
        </div>
      </ShowcaseSection>
    </main>
  );
}
