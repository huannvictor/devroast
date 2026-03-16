"use client";

import { ScoreRing } from "@/components/ui/score-ring";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockCode = `function check(a) {
  if (a == true) {
    return true;
  } else {
    return false;
  }
}`;

const mockIssues = [
  {
    title: "Redundant Boolean Comparison",
    description: "Comparing a boolean directly with '== true' is like asking if the sky is blue and then checking if the answer is yes.",
    severity: "critical",
  },
  {
    title: "The 'If-Return-Else-Return' Anti-pattern",
    description: "You're writing 5 lines of code for something that should be a single return statement. Your CPU is crying.",
    severity: "warning",
  },
  {
    title: "Missing Type Safety",
    description: "Using 'a' as a parameter name? What is this, 1995? Give it a type and a real name.",
    severity: "critical",
  },
  {
    title: "Excessive Verbosity",
    description: "This function has more boiler plate than a 19th-century steam engine.",
    severity: "warning",
  },
];

export default function RoastResults() {
  return (
    <main className="flex w-full flex-col items-center gap-10 bg-bg-page px-10 py-20">
      <section className="flex w-full max-w-[960px] flex-col gap-10">
        {/* Score Hero (x3tP9) */}
        <div className="flex items-center gap-12">
          <ScoreRing value={12} size="lg" strokeWidth={6} />
          <div className="flex flex-col gap-4">
            <h1 className="font-mono text-3xl font-bold text-text-primary">
              Your code is a disaster.
            </h1>
            <p className="font-mono text-lg text-text-secondary leading-relaxed">
              {"// Honestly, I've seen better logic in a fortune cookie. This function is so redundant it's practically a recursive loop of disappointment."}
            </p>
            <div className="flex gap-3">
              <Badge variant="critical">12/100 shameful points</Badge>
              <Badge variant="warning">Efficiency: 2%</Badge>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-border-primary" />

        {/* Submitted Code Section (alSUH) */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">{"//"}</span>
            <h2 className="font-mono text-sm font-bold text-text-primary">submitted_code</h2>
          </div>
          <CodeBlock 
            code={mockCode} 
            language="javascript" 
            fileName="shameful_check.js"
          />
        </div>

        <div className="h-px w-full bg-border-primary" />

        {/* Analysis Section (Hn3pX) */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">{"//"}</span>
            <h2 className="font-mono text-sm font-bold text-text-primary">detailed_analysis</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-5">
            {mockIssues.map((issue, i) => (
              <Card 
                key={i}
                variant="elevated"
                header={
                  <Badge variant={issue.severity as any} size="sm">
                    {issue.severity.toUpperCase()}
                  </Badge>
                }
              >
                <h3 className="font-mono text-[15px] font-bold text-text-primary">
                  {issue.title}
                </h3>
                <p className="font-mono text-xs text-text-secondary leading-relaxed">
                  {issue.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-border-primary" />

        {/* Diff Section (EGXHQ) */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">{"//"}</span>
            <h2 className="font-mono text-sm font-bold text-text-primary">suggested_fix</h2>
          </div>

          <div className="overflow-hidden rounded-md border border-border-primary bg-bg-input">
            <div className="flex h-10 items-center border-b border-border-primary px-4">
              <span className="font-mono text-xs text-text-secondary">
                shameful_check.js → better_code.js
              </span>
            </div>
            <div className="py-2">
              <DiffLine variant="context">{"function check(a) {"}</DiffLine>
              <DiffLine variant="removed">{"  if (a == true) {"}</DiffLine>
              <DiffLine variant="removed">{"    return true;"}</DiffLine>
              <DiffLine variant="removed">{"  } else {"}</DiffLine>
              <DiffLine variant="removed">{"    return false;"}</DiffLine>
              <DiffLine variant="removed">{"  }"}</DiffLine>
              <DiffLine variant="added">{"  return !!a;"}</DiffLine>
              <DiffLine variant="context">{"}"}</DiffLine>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Link href="/">
            <Button variant="secondary">
              {"< back_to_editor"}
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
