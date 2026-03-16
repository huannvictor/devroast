"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import { getSingletonHighlighter } from "shiki";
import { tv, type VariantProps } from "tailwind-variants";

const codeBlock = tv({
  slots: {
    root: "rounded-md border border-border-primary bg-bg-input overflow-hidden",
    header:
      "flex items-center gap-3 h-10 px-4 border-b border-border-primary",
    dots: "flex items-center gap-2",
    dot: "h-2.5 w-2.5 rounded-full",
    fileName: "text-xs text-text-tertiary font-mono",
    body: "flex",
    lineNumbers:
      "flex-shrink-0 w-10 text-right py-3 px-2.5 text-text-tertiary select-none text-[13px] font-mono bg-bg-surface border-r border-border-primary leading-6",
    content:
      "overflow-x-auto p-3 text-[13px] leading-6 [&_pre]:!bg-transparent [&_pre]:!leading-6",
  },
});

type CodeBlockProps = Omit<ComponentProps<"div">, "lang"> &
  VariantProps<typeof codeBlock> & {
    code: string;
    language: "typescript" | "javascript" | "css" | "html";
    fileName?: string;
    showLineNumbers?: boolean;
  };

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

function CodeBlock({
  className,
  code,
  language,
  fileName,
  showLineNumbers = true,
  ...props
}: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState("");
  const lineCount = code.split('\n').length;

  useEffect(() => {
    getHighlighterSingleton().then((highlighter) => {
      const html = highlighter.codeToHtml(code, {
        lang: language,
        theme: "vesper",
      });
      setHighlightedCode(html);
    });
  }, [code, language]);

  const {
    root,
    header,
    dots,
    dot,
    fileName: fileNameSlot,
    body,
    lineNumbers,
    content,
  } = codeBlock();

  if (!highlightedCode) {
    return (
      <div
        className={root({
          className:
            "flex items-center justify-center py-4 min-h-[100px] animate-pulse",
        })}
      >
        <span className="text-text-secondary text-sm">
          Loading code...
        </span>
      </div>
    );
  }

  return (
    <div className={root({ className })} {...props}>
      <div className={header()}>
        <div className={dots()}>
          <div className={dot({ class: "bg-[#EF4444]" })} />
          <div className={dot({ class: "bg-[#F59E0B]" })} />
          <div className={dot({ class: "bg-[#10B981]" })} />
        </div>
        {fileName && <span className={fileNameSlot()}>{fileName}</span>}
      </div>

      <div className={body()}>
        {showLineNumbers && (
          <div className={lineNumbers()}>
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={String(i + 1)}>{i + 1}</div>
            ))}
          </div>
        )}
        <div
          className={content()}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki's output is trusted HTML for syntax highlighting.
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}

export { CodeBlock, type CodeBlockProps, codeBlock };
