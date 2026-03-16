"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import { getSingletonHighlighter } from "shiki";
import { tv, type VariantProps } from "tailwind-variants";

const codeBlock = tv({
  slots: {
    root: "rounded-md border border-border-primary bg-bg-input overflow-hidden",
    header: "flex items-center gap-3 h-10 px-4 border-b border-border-primary",
    dots: "flex items-center gap-2",
    dot: "size-2.5 rounded-full",
    fileName: "text-xs text-text-tertiary font-mono",
    body: "flex",
    lineNumbers:
      "shrink-0 w-10 text-right py-3 px-2.5 text-text-tertiary select-none text-13 font-mono bg-bg-surface border-r border-border-primary leading-6",
    content:
      "overflow-x-auto p-3 text-13 leading-6 [&_pre]:bg-transparent! [&_pre]:leading-6!",
  },
});

type CodeBlockRootProps = ComponentProps<"div"> &
  VariantProps<typeof codeBlock>;

function CodeBlockRoot({ className, ...props }: CodeBlockRootProps) {
  const { root } = codeBlock();
  return <div className={root({ className })} {...props} />;
}

function CodeBlockHeader({ className, ...props }: ComponentProps<"div">) {
  const { header } = codeBlock();
  return <div className={header({ className })} {...props} />;
}

function CodeBlockDots() {
  const { dots, dot } = codeBlock();
  return (
    <div className={dots()}>
      <div className={dot({ class: "bg-accent-red" })} />
      <div className={dot({ class: "bg-accent-amber" })} />
      <div className={dot({ class: "bg-accent-green" })} />
    </div>
  );
}

function CodeBlockFileName({ className, ...props }: ComponentProps<"span">) {
  const { fileName } = codeBlock();
  return <span className={fileName({ className })} {...props} />;
}

function CodeBlockBody({ className, ...props }: ComponentProps<"div">) {
  const { body } = codeBlock();
  return <div className={body({ className })} {...props} />;
}

function CodeBlockLineNumbers({
  className,
  count,
  ...props
}: ComponentProps<"div"> & { count: number }) {
  const { lineNumbers } = codeBlock();
  return (
    <div className={lineNumbers({ className })} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={String(i + 1)}>{i + 1}</div>
      ))}
    </div>
  );
}

let highlighterPromise: Promise<
  Awaited<ReturnType<typeof getSingletonHighlighter>>
> | null = null;

function getHighlighterSingleton() {
  if (!highlighterPromise) {
    highlighterPromise = getSingletonHighlighter({
      themes: ["vesper"],
      langs: ["typescript", "javascript", "css", "html"],
    });
  }
  return highlighterPromise;
}

function CodeBlockContent({
  className,
  code,
  language,
}: {
  className?: string;
  code: string;
  language: "typescript" | "javascript" | "css" | "html";
}) {
  const [highlightedCode, setHighlightedCode] = useState("");
  const { content, root } = codeBlock();

  useEffect(() => {
    getHighlighterSingleton().then((highlighter) => {
      const html = highlighter.codeToHtml(code, {
        lang: language,
        theme: "vesper",
      });
      setHighlightedCode(html);
    });
  }, [code, language]);

  if (!highlightedCode) {
    return (
      <div
        className={root({
          className:
            "flex items-center justify-center py-4 min-h-25 animate-pulse border-none bg-transparent",
        })}
      >
        <span className="text-text-secondary text-sm">Loading code...</span>
      </div>
    );
  }

  return (
    <div
      className={content({ className })}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki's output is trusted HTML for syntax highlighting.
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}

export {
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockDots,
  CodeBlockFileName,
  CodeBlockHeader,
  CodeBlockLineNumbers,
  CodeBlockRoot as CodeBlock,
  CodeBlockRoot,
  codeBlock,
};
