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
export function formatInlineText(text: string): React.ReactNode {
  if (!text) return "";
  const cleaned = text.replace(/#{1,4}\s*/g, ""); // Strip any stray # symbols

  // Split by bold **text**
  const parts = cleaned.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} style={{ fontWeight: 800, color: "var(--ink, #0D0F0A)" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export function parseArticleContent(input: string | string[] = []): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  const rawText = Array.isArray(input) ? input.join("\n\n") : String(input || "");
  if (!rawText.trim()) return blocks;

  // Insert line breaks before any inline "# ", "## ", "### " headings
  const normalized = rawText
    .replace(/(?<!\n)(#{1,4}\s+)/g, "\n\n$1")
    .split(/\r?\n\s*\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  for (const chunk of normalized) {
    if (/^####\s+/.test(chunk)) {
      blocks.push({ type: "h3", text: chunk.replace(/^####\s+/, "").trim() });
    } else if (/^###\s+/.test(chunk)) {
      blocks.push({ type: "h3", text: chunk.replace(/^###\s+/, "").trim() });
    } else if (/^##\s+/.test(chunk)) {
      blocks.push({ type: "h2", text: chunk.replace(/^##\s+/, "").trim() });
    } else if (/^#\s+/.test(chunk)) {
      blocks.push({ type: "h1", text: chunk.replace(/^#\s+/, "").trim() });
    } else if (/^>\s+/.test(chunk)) {
      blocks.push({ type: "quote", text: chunk.replace(/^>\s+/, "").trim() });
    } else if (/^[-*•]\s+/.test(chunk)) {
      const items = chunk
        .split(/\r?\n/)
        .map((l) => l.replace(/^[-*•]\s+/, "").trim())
        .filter(Boolean);
      blocks.push({ type: "list", items });
    } else {
      blocks.push({ type: "p", text: chunk });
    }
  }

  return blocks;
}
