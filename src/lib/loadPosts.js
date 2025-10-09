// src/lib/loadPosts.js
// Robust Markdown loader — supports image, excerpt, tags, etc.
// Safe for Netlify builds (no silent failures, BOM-safe)

const files = Object.assign(
  {},
  import.meta.glob("/posts/*.md",       { as: "raw", eager: true }),
  import.meta.glob("/src/posts/*.md",   { as: "raw", eager: true }),
  import.meta.glob("../posts/*.md",     { as: "raw", eager: true }),
  import.meta.glob("./posts/*.md",      { as: "raw", eager: true })
);

// Clean weird hidden chars (BOM, zero-width)
const clean = (s) =>
  (s || "").replace(/^\uFEFF/, "").replace(/[\u200B\u200C\u200D]/g, "");

// Simple frontmatter parser (no external deps)
function parseFrontMatter(raw) {
  const src = clean(raw);
  const m = src.match(
    /^[\s\u200B\u200C\u200D]*-{3,}\s*\n([\s\S]*?)\n[\s\u200B\u200C\u200D]*-{3,}\s*\n?/
  );
  if (!m) return { data: {}, content: src };

  const fm = m[1];
  const content = src.slice(m[0].length);
  const data = {};
  fm.split(/\r?\n/).forEach((line) => {
    const t = line.trim();
    if (!t || t.startsWith("#")) return;
    const i = t.indexOf(":");
    if (i === -1) return;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    )
      v = v.slice(1, -1);

    // Try parsing arrays or JSON-like values
    if (v.startsWith("[") && v.endsWith("]")) {
      try {
        v = JSON.parse(v);
      } catch {}
    }

    data[k] = v;
  });
  return { data, content };
}

// Helpers
const firstHeading = (md) =>
  (md || "")
    .split("\n")
    .find((l) => /^#\s+/.test(l))
    ?.replace(/^#\s+/, "")
    .trim() || "";

const firstNonEmpty = (md) =>
  (md || "")
    .split("\n")
    .find((l) => l.trim() && !l.trim().startsWith("#"))
    ?.trim() || "";

const safeDate = (d) => (d ? String(d) : "");

// ======================================================
// 🧩 Get all posts
// ======================================================
export function getAllPosts() {
  return Object.entries(files)
    .map(([path, raw]) => {
      const { data, content } = parseFrontMatter(raw);
      const slug = path.split("/").pop().replace(/\.md$/, "");

      const title = data.title || firstHeading(content) || slug;
      const dateObj = new Date(data.date);
      const date = isNaN(+dateObj)
        ? safeDate(data.date)
        : dateObj.toISOString();
      const excerpt =
        data.excerpt || firstNonEmpty(content).slice(0, 200).trim();
      const image = data.image || ""; // ✅ new line — pulls from frontmatter

      return {
        slug,
        title,
        date,
        excerpt,
        image, // ✅ include in all-posts view
      };
    })
    .sort(
      (a, b) =>
        (b.date || "").localeCompare(a.date || "") ||
        b.slug.localeCompare(a.slug)
    );
}

// ======================================================
// 🧩 Get a single post by slug
// ======================================================
export function getPostBySlug(slug) {
  const s = String(slug).replace(/^\/+/, "");
  const key = Object.keys(files).find((k) => k.endsWith(`/${s}.md`));
  if (!key) return null;

  const { data, content } = parseFrontMatter(files[key]);
  return {
    slug: s,
    title: data.title || firstHeading(content) || s,
    date: safeDate(data.date),
    tags: data.tags || [],
    excerpt: data.excerpt || firstNonEmpty(content).slice(0, 200).trim(),
    image: data.image || "", // ✅ include image for individual post
    content: content ?? "",
  };
}

