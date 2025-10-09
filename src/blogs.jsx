import React from "react";
import { Search, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Demo posts
const POSTS = [
  {
    id: "supabase-prototyping",
    title:
      "Supabase for Rapid Prototyping — A Hands-On Guide to Easy Integration and Multi-Solution Databases",
    date: "August 1, 2025",
    read: "5 min read",
    excerpt:
      "What is Supabase? A backend-as-a-service built on PostgreSQL that bundles auth, storage, real-time subs, serverless edge functions, and more — perfect for fast ML product prototyping.",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1600&auto=format&fit=crop",
    href: "#",
    featured: true,
  },
  {
    id: "gpt-study",
    title:
      "ChatGPT “Study and Learn” — A Deep Dive into the New Guided Learning Mode",
    date: "August 1, 2025",
    read: "5 min read",
    excerpt:
      "We explore structured learning flows in ChatGPT, how the system scaffolds understanding, and practical prompts to get the most out of it.",
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "tech-hiring",
    title:
      "The Dark Side of Tech Hiring: Lessons from the Soham Parekh Scandal",
    date: "July 7, 2025",
    read: "5 min read",
    excerpt:
      "What the recent scandal tells us about reference checks, due diligence, and culture in hyper-growth startups.",
    image:
      "https://images.unsplash.com/photo-1544198365-3c31f272c2b9?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "langchain-agents",
    title: "Agents in LangChain: The Basics for Beginners",
    date: "July 6, 2025",
    read: "4 min read",
    excerpt:
      "Understand tools, memory, and the agent loop — and build your first agent that actually finishes a task.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "agentic-workflows",
    title: "Getting Started with Agentic Workflows in n8n: A Beginner’s Guide",
    date: "July 6, 2025",
    read: "4 min read",
    excerpt:
      "Wire up autonomous tasks with triggers and guards in n8n, and integrate with LLM tools cleanly.",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "finetune-2025",
    title:
      "Fine-Tuning LLMs in 2025: From LoRA to Direct Preference Optimization",
    date: "July 6, 2025",
    read: "3 min read",
    excerpt:
      "A pragmatic overview of modern fine-tuning approaches, with when/why to use each and gotchas in production.",
    image:
      "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
];

const SmallCard = ({ post }) => (
  <a
    href={post.href}
    className="group block rounded-2xl border border-zinc-800 bg-zinc-900/70 hover:bg-white hover:border-zinc-200 transition-all duration-300 overflow-hidden"
  >
    <div className="aspect-[16/9] w-full overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
    <div className="p-5">
      <h3 className="text-lg font-semibold leading-snug text-zinc-100 group-hover:text-black transition-colors">
        {post.title}
      </h3>
      <div className="mt-3 flex items-center justify-between text-sm text-zinc-400 group-hover:text-zinc-600 transition-colors">
        <span>{post.date}</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {post.read}
        </span>
      </div>
    </div>
  </a>
);

export default function Blog() {
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!q.trim()) return POSTS;
    const t = q.toLowerCase();
    return POSTS.filter((p) => p.title.toLowerCase().includes(t));
  }, [q]);

  const latest =
    filtered.find((p) => p.featured) ??
    (filtered.length > 0 ? filtered[0] : null);

  const more = latest ? filtered.filter((p) => p.id !== latest.id) : filtered;

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
            A curated collection of thoughts, code, and explorations from my
            digital journey.
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
          <p className="uppercase tracking-wider text-xs text-zinc-400">
            Latest Post
          </p>

          {!latest ? (
            <div className="mt-4 text-zinc-400">No posts match your search.</div>
          ) : (
            <a
              href={latest.href}
              className="group mt-3 grid md:grid-cols-2 gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 hover:bg-white hover:border-zinc-200 transition-all duration-300 overflow-hidden"
            >
              {/* Text */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 text-sm text-zinc-400 group-hover:text-zinc-600 transition-colors">
                  <span>{latest.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {latest.read}
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

              {/* Image */}
              <div className="relative">
                <img
                  src={latest.image}
                  alt={latest.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/10 to-transparent" />
              </div>
            </a>
          )}
        </section>

        {/* More Articles */}
        <section>
          <p className="uppercase tracking-wider text-xs text-zinc-400 mb-4">
            More Articles
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {more.map((p) => (
              <SmallCard key={p.id} post={p} />
            ))}
          </div>
        </section>

        {/* Bottom back link */}
        <div className="pt-12 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition">
  <ArrowLeft className="w-4 h-4" /> Go back to Home
</Link>
        </div>
      </div>
    </div>
  );
}
