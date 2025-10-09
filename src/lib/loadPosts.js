// src/lib/loadPosts.js
// Ultra-robust front-matter loader that does NOT depend on gray-matter.

const files = Object.assign(
  {},
  import.meta.glob("/posts/*.md",       { as: "raw", eager: true }),
  import.meta.glob("/src/posts/*.md",   { as: "raw", eager: true }),
  import.meta.glob("../posts/*.md",     { as: "raw", eager: true }),
  import.meta.glob("./posts/*.md",      { as: "raw", eager: true })
);

// For diagnostics in blogs.jsx
export const __matchedPaths = () => Object.keys(files).sort();

// Strip BOM & zero-width
const clean = (s) =>
  (s || "")
    .replace(/^\uFEFF/, "")
    .replace(/[\u200B\u200C\u200D]/g, "");

// Very tolerant front-matter extractor:
// - Allows whitespace/hidden chars around ---
// - Captures YAML-like lines `key: value`
function parseFrontMatter(raw) {
  const src = clean(raw);
  const re =
    /^[\s\u200B\u200C\u200D]*-{3,}\s*\n([\s\S]*?)\n[\s\u200B\u200C\u200D]*-{3,}\s*\n?/;
  const m = src.match(re);

  if (!m) {
    return { data: {}, content: src };
  }

  const fmBlock = m[1];
  const content = src.slice(m[0].length);

  // Tiny YAML-ish parser (handles simple scalar fields)
  const data = {};
  fmBlock.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const idx = trimmed.indexOf(":");
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1).trim();
    // remove surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  });

  return { data, content };
}

const firstHeading = (md) => {
  const line = (md || "").split("\n").find((l) => /^#\s+/.test(l));
  return line ? line.replace(/^#\s+/, "").trim() : "";
};
const firstNonEmpty = (md) =>
  (md || "").split("\n").find((l) => l.trim()) || "";
const safeDate = (d) => (d ? String(d) : "");

export function getAllPosts() {
  const posts = Object.entries(files)
    .map(([path, raw]) => {
      try {
        const { data, content } = parseFrontMatter(raw);
        const slug = path.split("/").pop().replace(/\.md$/, "");
        const title = data.title || firstHeading(content) || slug;
        const date = safeDate(data.date);
        const excerpt = (data.excerpt || firstNonEmpty(content))
          .slice(0, 260)
          .trim();

        return { slug, title, date, excerpt };
      } catch (e) {
        console.error("getAllPosts parse error for", path, e);
        return null;
      }
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        (b.date || "").localeCompare(a.date || "") ||
        b.slug.localeCompare(a.slug)
    );

  return posts;
}

export function getPostBySlug(slug) {
  const cleanSlug = String(slug).replace(/^\/+/, "");
  const key = Object.keys(files).find((k) => k.endsWith(`/${cleanSlug}.md`));
  if (!key) return null;

  try {
    const { data, content } = parseFrontMatter(files[key]);
    return {
      slug: cleanSlug,
      title: data.title || firstHeading(content) || cleanSlug,
      date: safeDate(data.date),
      tags: data.tags || [],
      content: content ?? "",
    };
  } catch (e) {
    console.error("getPostBySlug parse error for", key, e);
    return null;
  }
}
