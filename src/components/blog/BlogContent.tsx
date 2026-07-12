"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface BlogContentProps {
  content: string;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 border border-dark-500 text-slate-400 hover:text-white hover:border-pixel-blue transition-all"
      aria-label={copied ? "Copied!" : "Copy code"}
    >
      {copied ? <Check size={12} className="text-pixel-green" /> : <Copy size={12} />}
    </button>
  );
}

export default function BlogContent({ content }: BlogContentProps) {
  // Parse the markdown-like content
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code block
      if (line.startsWith("```")) {
        const lang = line.slice(3).trim() || "text";
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        const code = codeLines.join("\n");
        elements.push(
          <div key={i} className="my-6 relative group">
            <div className="flex items-center justify-between bg-dark-800 border-t-2 border-l-2 border-r-2 border-dark-600 px-4 py-2">
              <span className="font-pixel text-[8px] text-pixel-green">{lang.toUpperCase()}</span>
              <CopyButton code={code} />
            </div>
            <SyntaxHighlighter
              language={lang}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                border: "2px solid #334155",
                borderTop: "none",
                fontSize: "13px",
              }}
              showLineNumbers
            >
              {code}
            </SyntaxHighlighter>
          </div>
        );
        i++;
        continue;
      }

      // H1
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="font-pixel text-xl text-dark-900 dark:text-white mt-8 mb-4 leading-relaxed">
            {line.slice(2)}
          </h1>
        );
        i++;
        continue;
      }

      // H2
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="font-pixel text-base text-pixel-blue mt-8 mb-3 leading-relaxed">
            {line.slice(3)}
          </h2>
        );
        i++;
        continue;
      }

      // H3
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="font-pixel text-sm text-dark-900 dark:text-white mt-6 mb-2 leading-relaxed">
            {line.slice(4)}
          </h3>
        );
        i++;
        continue;
      }

      // Empty line
      if (line.trim() === "") {
        i++;
        continue;
      }

      // Paragraph with inline code and bold
      const renderInline = (text: string) => {
        const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
        return parts.map((part, pi) => {
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code key={pi} className="px-1.5 py-0.5 bg-dark-100 dark:bg-dark-700 text-pixel-green font-mono text-sm border border-dark-300 dark:border-dark-600">
                {part.slice(1, -1)}
              </code>
            );
          }
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={pi} className="text-dark-900 dark:text-white font-semibold">{part.slice(2, -2)}</strong>;
          }
          return part;
        });
      };

      elements.push(
        <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {renderInline(line)}
        </p>
      );
      i++;
    }

    return elements;
  };

  return (
    <article className="max-w-none">
      {renderContent(content)}
    </article>
  );
}
