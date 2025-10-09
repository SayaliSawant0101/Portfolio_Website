import React from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "./lib/loadPosts";

export default function Blog() {
  const [q, setQ] = React.useState("");

  const posts = React.useMemo(() => {
    try {
      return getAllPosts();
    } catch (e) {
      console.error("[Blog] getAllPosts failed:", e);
      return [];
    }
  }, []);

  const filtered = React.useMemo(() => {
    if (!q.trim()) return posts;
    const t = q.toLowerCase();
    return posts.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(t) ||
        (p.excerpt || "").toLowerCase().includes(t)
    );
  }, [q, posts]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        color: "#eee",
        padding: 24,
        fontFamily: "system-ui",
      }}
    >
      <p>
        <Link to="/" style={{ color: "#9cf" }}>
          ← Back to Home
        </Link>
      </p>
      <h1 style={{ fontSize: 28, margin: "12px 0" }}>All Posts</h1>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search…"
        style={{
          padding: "10px 12px",
          borderRadius: 999,
          border: "1px solid #333",
          background: "#121212",
          color: "#eee",
          width: "100%",
          maxWidth: 480,
        }}
      />

      {!filtered.length ? (
        <p style={{ marginTop: 16, color: "#aaa" }}>No posts found.</p>
      ) : (
        <ul style={{ marginTop: 20, listStyle: "none", padding: 0 }}>
          {filtered.map((p) => (
            <li key={p.slug} style={{ margin: "16px 0" }}>
              <Link
                to={`/blog/${p.slug}`}
                style={{
                  color: "#9cf",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                {p.title}
              </Link>{" "}
              <small style={{ color: "#aaa" }}>({p.date || "—"})</small>
              {p.excerpt && (
                <div style={{ color: "#bbb", marginTop: 4 }}>{p.excerpt}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
