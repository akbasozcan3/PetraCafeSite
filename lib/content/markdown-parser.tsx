import React from "react";
import Link from "next/link";

export interface ArticleBlock {
  type: "h1" | "h2" | "h3" | "p" | "quote" | "list";
  text?: string;
  items?: string[];
}

/** Strip markdown hashes and clean up text */
export function cleanRawText(text: string): string {
  if (!text) return "";
  return text
    .replace(/^#{1,4}\s+/gm, "")
    .replace(/(?:\s|^)#{1,4}\s+/g, " ")
    .trim();
}

/** Formats inline markdown like **bold**, *italic*, [link](url) safely into React elements */
export function formatInlineText(text: string, boldColor?: string): React.ReactNode {
  if (!text) return "";
  const cleaned = text.replace(/^#{1,4}\s*/gm, "");

  // Match links [text](url) and bold **text** and italic *text*
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = cleaned.split(tokenRegex);

  return parts.map((part, index) => {
    // Check [link](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkHref = linkMatch[2];
      const isInternal = linkHref.startsWith("/") || linkHref.startsWith("#");
      if (isInternal) {
        return (
          <Link
            key={index}
            href={linkHref}
            style={{
              color: "var(--olive-lo, #5A6838)",
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            {linkText}
          </Link>
        );
      }
      return (
        <a
          key={index}
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--olive-lo, #5A6838)",
            fontWeight: 600,
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          {linkText}
        </a>
      );
    }

    // Check **bold**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} style={{ fontWeight: 700, color: boldColor || "inherit" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Check *italic*
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} style={{ fontStyle: "italic", opacity: 0.9 }}>
          {part.slice(1, -1)}
        </em>
      );
    }

    return part;
  });
}

export function parseArticleContent(input: string | string[] = []): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  const rawText = Array.isArray(input) ? input.join("\n\n") : String(input || "");
  if (!rawText.trim()) return blocks;

  const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  let currentParagraph = "";

  for (const line of lines) {
    if (/^####\s+/.test(line)) {
      if (currentParagraph) {
        blocks.push({ type: "p", text: currentParagraph });
        currentParagraph = "";
      }
      blocks.push({ type: "h3", text: line.replace(/^####\s+/, "").trim() });
    } else if (/^###\s+/.test(line)) {
      if (currentParagraph) {
        blocks.push({ type: "p", text: currentParagraph });
        currentParagraph = "";
      }
      blocks.push({ type: "h3", text: line.replace(/^###\s+/, "").trim() });
    } else if (/^##\s+/.test(line)) {
      if (currentParagraph) {
        blocks.push({ type: "p", text: currentParagraph });
        currentParagraph = "";
      }
      blocks.push({ type: "h2", text: line.replace(/^##\s+/, "").trim() });
    } else if (/^#\s+/.test(line)) {
      if (currentParagraph) {
        blocks.push({ type: "p", text: currentParagraph });
        currentParagraph = "";
      }
      blocks.push({ type: "h1", text: line.replace(/^#\s+/, "").trim() });
    } else if (/^>\s+/.test(line)) {
      if (currentParagraph) {
        blocks.push({ type: "p", text: currentParagraph });
        currentParagraph = "";
      }
      blocks.push({ type: "quote", text: line.replace(/^>\s+/, "").trim() });
    } else if (/^[-*•]\s+/.test(line)) {
      if (currentParagraph) {
        blocks.push({ type: "p", text: currentParagraph });
        currentParagraph = "";
      }
      blocks.push({ type: "list", items: [line.replace(/^[-*•]\s+/, "").trim()] });
    } else {
      if (currentParagraph) {
        currentParagraph += " " + line;
      } else {
        currentParagraph = line;
      }
    }
  }

  if (currentParagraph) {
    blocks.push({ type: "p", text: currentParagraph });
  }

  return blocks;
}

/** Renders semantic HTML elements from ArticleBlocks */
export function renderSemanticBlocks(blocks: ArticleBlock[]): React.ReactNode[] {
  return blocks.map((block, idx) => {
    switch (block.type) {
      case "h1":
      case "h2":
        return (
          <h2
            key={idx}
            style={{
              fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 600,
              lineHeight: 1.25,
              letterSpacing: "-0.015em",
              color: "var(--ink, #0D0F0A)",
              margin: "18px 0 8px",
            }}
          >
            {formatInlineText(block.text || "")}
          </h2>
        );
      case "h3":
        return (
          <h3
            key={idx}
            style={{
              fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
              fontSize: "clamp(18px, 2.2vw, 22px)",
              fontWeight: 600,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              color: "var(--olive-lo, #5A6838)",
              margin: "14px 0 6px",
            }}
          >
            {formatInlineText(block.text || "")}
          </h3>
        );
      case "quote":
        return (
          <blockquote
            key={idx}
            style={{
              margin: "14px 0",
              padding: "16px 20px",
              borderLeft: "3px solid var(--brass, #D9A441)",
              background: "rgba(217, 164, 65, 0.08)",
              borderRadius: "0 14px 14px 0",
              fontStyle: "italic",
              fontSize: "15.5px",
              lineHeight: 1.7,
              color: "var(--ink, #0D0F0A)",
            }}
          >
            {formatInlineText(block.text || "")}
          </blockquote>
        );
      case "list":
        return (
          <ul
            key={idx}
            style={{
              margin: "10px 0 14px",
              paddingLeft: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {(block.items || []).map((item, itemIdx) => (
              <li
                key={itemIdx}
                style={{
                  fontSize: "15px",
                  lineHeight: 1.65,
                  color: "#383C30",
                }}
              >
                {formatInlineText(item)}
              </li>
            ))}
          </ul>
        );
      case "p":
      default:
        return (
          <p
            key={idx}
            style={{
              fontSize: "15.5px",
              lineHeight: 1.8,
              color: "#383C30",
              margin: 0,
            }}
          >
            {formatInlineText(block.text || "")}
          </p>
        );
    }
  });
}

