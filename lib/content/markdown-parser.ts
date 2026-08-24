export interface ArticleBlock {
  type: "h1" | "h2" | "h3" | "p" | "quote" | "list";
  text?: string;
  items?: string[];
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
