// src/pages/Post.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { getPostBySlug } from "../lib/loadPosts"; // ✅ use shared loader
import { marked as markedNS } from "marked";

const marked =
  typeof markedNS === "function"
    ? markedNS
    : markedNS?.parse
    ? markedNS.parse
    : (s) => s;

export default function Post() {
  const { slug } = useParams();

  const post = React.useMemo(() => getPostBySlug(slug), [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <h1 className="mt-6 text-2xl font-bold">Post not found</h1>
          <p className="mt-2 text-zinc-400">
            No markdown file at <code>/posts/{slug}.md</code>.
          </p>
        </div>
      </div>
    );
  }

  let html = "";
  try {
    html =
      typeof marked === "function"
        ? marked(post.content)
        : marked?.parse
        ? marked.parse(post.content)
        : post.content;
  } catch {
    html = post.content;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <h1 className="mt-6 text-3xl md:text-4xl font-extrabold">
          {post.title}
        </h1>
        <div className="mt-2 text-sm text-zinc-400 flex items-center gap-4">
          <span>{post.date || "—"}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {Math.max(1, Math.round((post.content.length || 200) / 900))} min read
          </span>
        </div>

        <article
          className="prose prose-invert mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
