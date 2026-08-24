import React from "react";

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

/** Formats inline markdown like **bold**, *italic* safely into React elements */
export function formatInlineText(text: string, boldColor?: string): React.ReactNode {
  if (!text) return "";
  const cleaned = text.replace(/^#{1,4}\s*/gm, "");

  // Split by bold **text**
  const parts = cleaned.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} style={{ fontWeight: 700, color: boldColor || "inherit" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
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
