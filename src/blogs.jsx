import React from "react";
import { Search, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllPosts } from "./lib/loadPosts";

// Nice date formatter
function formatDate(d) {
  if (!d) return "—";
  const t = new Date(d);
  return isNaN(+t)
    ? String(d)
    : t.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

// Small card with optional thumbnail
const SmallCard = ({ post }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group block rounded-2xl border border-zinc-800 bg-zinc-900/70 hover:bg-white hover:border-zinc-200 transition-all duration-300 overflow-hidden"
  >
    {/* Top image if available */}
    {post.image ? (
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    ) : (
      // graceful placeholder if no image in front matter
      <div className="aspect-[16/9] w-full bg-gradient-to-br from-zinc-900 to-zinc-800" />
    )}

    <div className="p-5">
      <h3 className="text-lg font-semibold leading-snug text-zinc-100 group-hover:text-black transition-colors">
        {post.title}
      </h3>
      <div className="mt-3 flex items-center justify-between text-sm text-zinc-400 group-hover:text-zinc-600 transition-colors">
        <span>{formatDate(post.date)}</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {Math.max(1, Math.round((post.excerpt?.length || 200) / 900))} min read
        </span>
      </div>
    </div>
  </Link>
);

export default function Blog() {
  const [q, setQ] = React.useState("");

  // Pull markdown posts (sorted newest-first by the loader)
  const posts = React.useMemo(() => getAllPosts(), []);

  // Search filter
  const filtered = React.useMemo(() => {
    if (!q.trim()) return posts;
    const t = q.toLowerCase();
    return posts.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(t) ||
        (p.excerpt || "").toLowerCase().includes(t)
    );
  }, [q, posts]);

  const latest = filtered.length ? filtered[0] : null;
  const more = latest ? filtered.slice(1) : [];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        {/* Top back link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Go back to Home
          </Link>
        </div>

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Digital Aurora
          </h1>
          <p className="mt-3 text-zinc-400">
            A curated collection of thoughts, code, and explorations from my digital journey.
          </p>

        {/* Search */}
          <div className="mt-6 mx-auto max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles by title…"
              className="w-full rounded-full bg-zinc-900/70 border border-zinc-800 pl-12 pr-4 py-3 text-sm outline-none focus:border-zinc-600"
            />
          </div>
        </header>

        {/* Latest Post */}
        <section>
          <p className="uppercase tracking-wider text-xs text-zinc-400">Latest Post</p>

          {!latest ? (
            <div className="mt-4 text-zinc-400">No posts match your search.</div>
          ) : (
            <Link
              to={`/blog/${latest.slug}`}
              className="group mt-3 grid md:grid-cols-2 gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 hover:bg-white hover:border-zinc-200 transition-all duration-300 overflow-hidden"
            >
              {/* Text */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 text-sm text-zinc-400 group-hover:text-zinc-600 transition-colors">
                  <span>{formatDate(latest.date)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {Math.max(1, Math.round((latest.excerpt?.length || 200) / 900))} min read
                  </span>
                </div>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold leading-snug text-zinc-100 group-hover:text-black transition-colors">
                  {latest.title}
                </h2>
                <p className="mt-3 text-zinc-300 group-hover:text-zinc-700 transition-colors">
                  {latest.excerpt}
                </p>
                <div className="mt-4">
                  <span className="text-violet-300 group-hover:text-violet-700 font-medium">
                    Read Article →
                  </span>
                </div>
              </div>

              {/* Image for latest (if provided) */}
              {latest.image ? (
                <img
                  src={latest.image}
                  alt={latest.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="hidden md:block bg-gradient-to-t from-zinc-950/10 to-transparent" />
              )}
            </Link>
          )}
        </section>

        {/* More Articles with thumbnails */}
        <section>
          <p className="uppercase tracking-wider text-xs text-zinc-400 mb-4">More Articles</p>
          <div className="grid md:grid-cols-2 gap-6">
            {more.map((p) => (
              <SmallCard key={p.slug} post={p} />
            ))}
          </div>
        </section>

        {/* Bottom back link */}
        <div className="pt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
