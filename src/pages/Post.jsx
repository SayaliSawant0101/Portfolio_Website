import React from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../lib/loadPosts";
import { marked as markedNS } from "marked";

// Support both export styles of "marked"
const marked =
  typeof markedNS === "function"
    ? markedNS
    : markedNS?.parse
    ? markedNS.parse
    : (s) => s;

export default function Post() {
  const { slug } = useParams();
  const post = React.useMemo(() => getPostBySlug(slug), [slug]);

  // Helpers
  const readTime = (txt) => {
    const words = (txt || "").trim().split(/\s+/).length || 200;
    return Math.max(1, Math.round(words / 200)) + " min read";
  };

  const formatDate = (d) => {
    if (!d) return "—";
    const t = new Date(d);
    return isNaN(+t)
      ? d
      : t.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  if (!post) {
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
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <p>
            <Link
              to="/blog"
              style={{ color: "#9cf", textDecoration: "none" }}
            >
              ← Back to all articles
            </Link>
          </p>
          <h1 style={{ marginTop: 16, fontSize: 28, fontWeight: 800 }}>
            Post not found
          </h1>
          <p style={{ marginTop: 8, color: "#bbb" }}>
            No markdown file at <code>/posts/{slug}.md</code>.
          </p>
        </div>
      </div>
    );
  }

  // Parse markdown
  let html = post.content;
  try {
    html =
      typeof marked === "function" ? marked(post.content) : post.content;
  } catch {}

  // Styles (scoped)
  const styles = `
  .page { min-height: 100vh; background:#0b0b0b; color:#eee; font-family: system-ui; }
  .wrap { max-width: 980px; margin: 0 auto; padding: 24px; }
  .back { color:#a78bfa; text-decoration:none; }
  .hero {
    position: relative;
    height: clamp(240px, 36vw, 400px);
    border-radius: 22px;
    overflow: hidden;
    background: #0f0f13;
  }
  .hero-img {
    position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
    filter: saturate(1.05) brightness(0.9);
    transform: scale(1.02);
    transition: transform 4s ease;
  }
  .hero-img:hover {
    transform: scale(1.05);
  }
  .hero-overlay {
    position:absolute; inset:0;
    background:
      radial-gradient(1000px 420px at 20% -10%, rgba(99,102,241,0.35), transparent 60%),
      radial-gradient(900px 360px at 110% 0%, rgba(34,197,94,0.33), transparent 50%),
      linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.6));
  }
  .hero-title {
    position:absolute; inset:0; display:grid; place-items:center; text-align:center;
    padding: 0 24px;
  }
  .hero-title h1{
    font-size: clamp(28px, 5vw, 56px);
    line-height: 1.08;
    font-weight: 900;
    letter-spacing: -0.01em;
    color: #fff;
    text-shadow: 0 12px 30px rgba(0,0,0,0.55);
  }
  .meta {
    display:flex; gap:16px; align-items:center; color:#a1a1aa; font-size:.95rem;
    margin: 16px 0 6px;
  }
  .dot { width:4px; height:4px; border-radius:999px; background:#666; }
  .article {
    color:#e7e7e7; line-height:1.75; margin-top: 18px;
  }
  .article :where(p, ul, ol, blockquote, pre, table, img, h1, h2, h3, h4, h5, h6) + * {
    margin-top: 1rem;
  }
  .article h2 {
    font-size: clamp(22px, 3.2vw, 28px); font-weight:800; letter-spacing:-0.01em;
    color:#c7f9e9; margin-top: 1.2rem;
  }
  .article h3 {
    font-size: clamp(18px, 2.6vw, 22px); font-weight:700; color:#cdeffd; margin-top: 1rem;
  }
  .article a { color:#7dd3fc; text-decoration:none; }
  .article a:hover { text-decoration:underline; }
  .article code:not(pre code){
    background: rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.08);
    padding:.15rem .35rem; border-radius:6px; font-family: ui-monospace, Menlo, Consolas, monospace;
  }
  .article pre {
    background:#0f1115; border:1px solid rgba(255,255,255,0.08);
    border-radius:14px; padding:14px; overflow:auto;
  }
  .tags { display:flex; flex-wrap:wrap; gap:8px; margin-top:18px;}
  .tag { font-size:12px; color:#7dd3fc; background:rgba(125,211,252,.12); border:1px solid rgba(125,211,252,.35);
         padding:6px 10px; border-radius:999px; }
  `;

  // ✅ Use CMS image or fallback
  const heroSrc =
    post.image && post.image.trim() !== ""
      ? post.image
      : "/uploads/default-hero.jpg"; // fallback image (put this in /public/uploads)

  return (
    <div className="page">
      <style>{styles}</style>

      <div className="wrap">
        <p>
          <Link to="/blog" className="back">
            ← Back to all articles
          </Link>
        </p>

        {/* HERO */}
        <div className="hero" aria-label="cover image">
          <img className="hero-img" src={heroSrc} alt={post.title} />
          <div className="hero-overlay" />
          <div className="hero-title">
            <h1>{post.title}</h1>
          </div>
        </div>

        {/* Meta */}
        <div className="meta">
          <span>{formatDate(post.date)}</span>
          <span className="dot" />
          <span>{readTime(post.content)}</span>
        </div>

        {/* Body */}
        <article
          className="article"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Tags */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="tags">
            {post.tags.map((t) => (
              <span key={t} className="tag">
                #{t}
              </span>
            ))}
          </div>
        )}

        <div style={{ marginTop: 28 }}>
          <Link to="/blog" className="back">
            ← Back to all articles
          </Link>
        </div>
      </div>
    </div>
  );
}
