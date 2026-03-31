import { createHighlighter, type Highlighter, type BundledLanguage } from "shiki";

/* ─── Supported languages ────────────────────────────────────────────────── */
export type SupportedLanguage =
  | "python" | "rust" | "go" | "lua"
  | "bash"   | "sh"   | "toml" | "json"
  | "typescript" | "javascript"
  | "text"   | "plaintext";

export const LANGUAGE_MAP: Record<string, SupportedLanguage> = {
  python:     "python",
  py:         "python",
  rust:       "rust",
  rs:         "rust",
  go:         "go",
  golang:     "go",
  lua:        "lua",
  bash:       "bash",
  sh:         "bash",
  shell:      "bash",
  zsh:        "bash",
  toml:       "toml",
  json:       "json",
  ts:         "typescript",
  typescript: "typescript",
  js:         "javascript",
  javascript: "javascript",
  text:       "text",
};

/* ─── CodeDev dark theme ─────────────────────────────────────────────────── */
export const CODEDEV_THEME = {
  name:       "codedev-dark",
  type:       "dark" as const,
  bg:         "#0D1117",
  fg:         "#E6EDF3",
  settings: [
    // Base
    { scope: [], settings: { foreground: "#E6EDF3", background: "#0D1117" } },
    // Comments
    { scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#5C6370", fontStyle: "italic" } },
    // Strings
    { scope: ["string", "string.quoted"],
      settings: { foreground: "#A5D6FF" } },
    // Numbers
    { scope: ["constant.numeric", "constant.character"],
      settings: { foreground: "#F2CC60" } },
    // Keywords
    { scope: ["keyword", "keyword.control", "storage.type", "storage.modifier"],
      settings: { foreground: "#79C0FF" } },
    // Operators
    { scope: ["keyword.operator"],
      settings: { foreground: "#FF7B72" } },
    // Functions / methods
    { scope: ["entity.name.function", "meta.function-call"],
      settings: { foreground: "#D2A8FF" } },
    // Types / classes
    { scope: ["entity.name.type", "entity.name.class", "support.type"],
      settings: { foreground: "#FFA657" } },
    // Variables
    { scope: ["variable", "variable.other"],
      settings: { foreground: "#E6EDF3" } },
    // Parameters
    { scope: ["variable.parameter"],
      settings: { foreground: "#E6EDF3", fontStyle: "italic" } },
    // Builtins / built-in functions
    { scope: ["support.function.builtin", "support.function"],
      settings: { foreground: "#79C0FF" } },
    // Constants / self / true / false / nil / None
    { scope: ["constant.language", "variable.language.self"],
      settings: { foreground: "#FF7B72" } },
    // Punctuation
    { scope: ["punctuation"],
      settings: { foreground: "#8B949E" } },
    // Tags / markup
    { scope: ["entity.name.tag"],
      settings: { foreground: "#7EE787" } },
    // Attributes
    { scope: ["entity.other.attribute-name"],
      settings: { foreground: "#79C0FF" } },
    // Regex
    { scope: ["string.regexp"],
      settings: { foreground: "#7EE787" } },
  ],
};

/* ─── Singleton highlighter (server-side only) ───────────────────────────── */
let highlighterPromise: Promise<Highlighter> | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes:    [CODEDEV_THEME],
      langs:     ["python", "rust", "go", "lua", "bash", "toml", "json", "typescript", "javascript"] as BundledLanguage[],
    });
  }
  return highlighterPromise;
}

/* ─── Highlight a code string → HTML ────────────────────────────────────────
   Returns an HTML string with <span> tokens. Used by the server component.
────────────────────────────────────────────────────────────────────────────── */
export async function highlightCode(
  code:     string,
  language: string,
  options?: { highlightLines?: number[] }
): Promise<{ html: string; lines: number }> {
  const lang    = LANGUAGE_MAP[language] ?? "text";
  const hl      = await getHighlighter();
  const lineCount = code.split("\n").length;

  try {
    const html = hl.codeToHtml(code, {
      lang,
      theme:             "codedev-dark",
      transformers: options?.highlightLines?.length
        ? [
            {
              line(node, line) {
                if (options.highlightLines!.includes(line)) {
                  node.properties["data-highlighted"] = "true";
                }
              },
            },
          ]
        : [],
    });
    return { html, lines: lineCount };
  } catch {
    // Fallback: plain text
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return {
      html:  `<pre style="background:#0D1117;color:#E6EDF3">${escaped}</pre>`,
      lines: lineCount,
    };
  }
}
