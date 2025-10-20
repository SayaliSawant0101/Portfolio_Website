// App.jsx — includes Show Skills slider, no dropdown, no Skills section, nav has direct buttons
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import InteractiveBackground from "@/components/InteractiveBackground";
import {
  Calendar,
  GraduationCap,
  School,
  CheckCircle2,
  Briefcase,
  MapPin,
  Sparkles,
  Cpu,
  ServerCog,
  BarChart3,
  Database,
  Cloud,
  Workflow,
  Home,
  BookOpen,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getAllPosts } from "./lib/loadPosts";

/* -------------------------------------------
   Animations (global)
-------------------------------------------- */
const STAGGER = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/* -------------------------------------------
   Section wrapper (centered headings)
-------------------------------------------- */
function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center"
        >
          <motion.h1
            variants={ITEM}
            className="text-5xl md:text-5xl font-extrabold text-center text-sky-400 drop-shadow-[0_0_4px_rgba(56,189,248,0.6)]"
          >
            <span className="relative inline-block">
              <span className="relative z-10">{title}</span>
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-sky-400 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]"
              >
                {title}
              </span>
              <br />
            </span>
          </motion.h1>
          {subtitle && (
            <motion.p variants={ITEM} className="text-1xl md:text-1xl text-zinc-300 mt-2 max-w-3xl mx-auto">
              {subtitle}
            </motion.p>
          )}
        </motion.div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

/* ======================================================================
   Slide-in Skills Panel (two cards per row)
====================================================================== */
const PANEL_SECTIONS = [
  {
    key: "ds",
    title: "Data Science",
    Icon: Cpu,
    note: "EDA • Feature Engineering • Model Building • Evaluation • Tuning",
    items: ["Python", "Regression", "Classification", "Clustering", "Prophet"],
    accent: "from-emerald-400/20 to-sky-400/20",
  },
  {
    key: "ai",
    title: "AI & Deep Learning",
    Icon: ServerCog,
    note: "Training • Fine-tuning • Embeddings • Transformers",
    items: ["Pytorch", "TensorFlow", "Keras", "OpenAI", "Hugging Face", "RNN", "NLP", "LLM", "RAG"],
    accent: "from-violet-400/20 to-fuchsia-400/20",
  },
  {
    key: "data",
    title: "Databases",
    Icon: Database,
    note: "ETL • Advance query • Warehousing",
    items: ["SQL", "PostgreSQL", "MySQL", "NoSQL", "MongoDB", "Hive"],
    accent: "from-cyan-400/20 to-emerald-400/20",
  },
  {
    key: "viz",
    title: "Analytics & Visualization",
    Icon: BarChart3,
    note: "Dashboards • Reporting • Insight storytelling",
    items: ["SQL", "Tableau", "Power BI", "Plotly", "Matplotlib", "Excel", "Streamlit", "Gradio"],
    accent: "from-amber-400/20 to-rose-400/20",
  },
  {
    key: "cloud",
    title: "Cloud",
    Icon: Cloud,
    note: "AWS",
    items: ["S3", "Athena", "Glue", "IAM", "Redshift", "Crawler"],
    accent: "from-sky-400/20 to-blue-400/20",
  },
  {
    key: "flow",
    title: "Project Management",
    Icon: Workflow,
    note: "Agile • Version control • Collaboration",
    items: ["GitHub", "JIRA", "Monday.com"],
    accent: "from-indigo-400/20 to-emerald-400/20",
  },
];

function SkillsSlideInPanelInline({ triggerClassName = "" }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  return (
    <>
      {/* Trigger button (inline) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={[
          "inline-flex items-center gap-2 rounded-lg border border-zinc-800 text-zinc-200 hover:border-emerald-500 hover:text-white transition px-3 py-2 text-sm",
          triggerClassName,
        ].join(" ")}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18" />
          <path d="M3 6h18" />
          <path d="M3 18h18" />
        </svg>
        Technical Skillsets
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sliding panel */}
      <aside
        className={[
          "fixed top-0 left-0 z-50 h-screen w-[760px] max-w-[96vw]",
          "bg-zinc-950 border-r border-zinc-800",
          "transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
          "shadow-[0_0_80px_-20px_rgba(16,185,129,0.35)]",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Skills Panel"
      >
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
          <strong className="px-4 text-sky-400 tracking-wide text-2xl"> Skills Snapshot</strong>
          <span className="mx-2 text-zinc-600">•</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="ml-auto rounded-lg border border-zinc-700 px-2 py-1 text-zinc-200 hover:border-emerald-400"
            aria-label="Close skills panel"
          >
            ✕
          </button>
        </div>

        {/* Content: two cards per row */}
        <div className="h-[calc(100vh-116px)] overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            {PANEL_SECTIONS.map(({ key, title, Icon, note, items, accent }) => {
              const filtered = query ? items.filter((t) => t.toLowerCase().includes(query)) : items;
              if (query && filtered.length === 0) return null;

              return (
                <div key={key} className={`rounded-2xl p-[1px] bg-gradient-to-br ${accent} border border-zinc-800/70`}>
                  <div className="rounded-2xl bg-zinc-950/90 backdrop-blur border border-zinc-900/70 p-4 h-full">
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div className="inline-flex size-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
                        <Icon className="w-5 h-5 text-zinc-200 animate-pulse" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold">{title}</h3>
                          <Sparkles className="w-4 h-4 text-sky-300/70 animate-pulse" />
                        </div>
                        {note && <p className="text-[12px] text-zinc-400 mt-0.5">{note}</p>}
                      </div>
                    </div>

                    {/* Chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {filtered.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full border border-zinc-700/70 bg-zinc-900/70 text-[11px] text-zinc-200"
                          title={t}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}

/* -------------------------------------------
   ScrollGuide (portal) — dot + label in one flex row
-------------------------------------------- */
const SECTION_GUIDE = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blogs" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function useScrollSpy(ids, rootMargin = "-40% 0px -55% 0px") {
  const [active, setActive] = useState(ids[0]);
  const obsRef = React.useRef(null);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    if (obsRef.current) obsRef.current.disconnect();

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { root: null, rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach((el) => obs.observe(el));
    obsRef.current = obs;
    return () => obs.disconnect();
  }, [ids, rootMargin]);

  return active;
}

function ScrollGuideInner({ side = "right", topClass = "top-100" }) {
  const ids = React.useMemo(() => SECTION_GUIDE.map((s) => s.id), []);
  const active = useScrollSpy(ids);

  // horizontal position class
  const posSide = side === "right" ? "right-4 md:right-6" : "left-4 md:left-6";

  return (
    <div
      className={[
        "fixed",
        posSide,
        topClass,
        "z-[2147483647]",
        "flex flex-col items-center gap-2",
        "pointer-events-none select-none",
      ].join(" ")}
      aria-label="Section guide"
    >
      {/* vertical spacing between rows */}
      <ul className="flex flex-col gap-1 md:gap-1">
        {SECTION_GUIDE.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} className="pointer-events-auto px-0 py-0">
              {/* Dot + Label as a single flex row */}
              <div
                className={[
                  "flex items-center",
                  side === "right" ? "flex-row-reverse" : "flex-row",
                  "gap-3 md:gap-4",
                ].join(" ")}
              >
                {/* Dot */}
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  title={s.label}
                  className={[
                    "block rounded-full",
                    "w-2.5 h-2.5 md:w-3 md:h-3",
                    "bg-zinc-700/80 border border-zinc-600/80",
                    "transition outline-none hover:bg-zinc-600 hover:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400/60",
                    isActive
                      ? "bg-sky-400 border-sky-400 ring-2 ring-sky-400/25 scale-110 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                      : "",
                  ].join(" ")}
                />

                {/* Label */}
                <span
                  className={[
                    "px-0 py-0 rounded-md backdrop-blur",
                    "text-[12px] md:text-sm",
                    side === "right" ? "text-right" : "text-left",
                    isActive
                      ? "text-sky-300 bg-zinc-900/60 shadow-[0_0_20px_rgba(56,189,248,0.35)]"
                      : "text-zinc-300/90 bg-zinc-900/50 opacity-75",
                  ].join(" ")}
                >
                  {s.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ScrollGuide(props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(<ScrollGuideInner {...props} />, document.body);
}

/* -------------------------------------------
   App
-------------------------------------------- */
export default function App() {
  // Smooth anchor scroll
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Navbar links with icons
  const NAV_LINKS = [
    { href: "#home", label: "Home", Icon: Home },
    { href: "#experience", label: "Experience", Icon: Briefcase },
    { href: "#projects", label: "Projects", Icon: Cpu },
    { href: "#blog", label: "Blogs", Icon: BookOpen },
    { href: "#education", label: "Education", Icon: GraduationCap },
    { href: "#contact", label: "Contact", Icon: Mail },
  ];

  return (
    <div className="min-h-screen text-zinc-100 relative">
      {/* Background */}
      <InteractiveBackground />

      {/* Right Scroll Guide */}
      <ScrollGuide side="right" topClass="top-60" />

      <main className="relative z-10">
        {/* ------------------------------ NAV ------------------------------ */}
        <header className="sticky top-0 z-40 bg-zinc-950/70 backdrop-blur border-b border-zinc-800/80">
          <div className="relative max-w-7xl mx-auto h-16 flex items-center justify-between px-0">
            <a href="#home" className="text-2xl font-extrabold tracking-tight text-emerald-300">
              SS
            </a>
            <nav className="flex items-center gap-2">
              {NAV_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition text-sm"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* ------------------------------ HERO ----------------------------- */}
        <section id="home" className="relative pt-20 md:pt-30 pb-24 md:pb-28">
          <div className="w-full px-6 md:px-12 lg:px-22 flex justify-end gap-11 items-start">
            {/* LEFT: TEXT */}
            <div className="pl-0 md:pl-20 lg:pl-30">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-montserrat font-bold leading-loose tracking-tight"
              >
                Hi, I’m{" "}
                <span className="font-montserrat font-extrabold text-sky-400 drop-shadow-[0_0_4px_rgba(56,189,248,0.6)]">
                  Sayali
                </span>
              </motion.h1>
              <br />
              <motion.h6
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
                viewport={{ once: true }}
                className="text-4xl font-light italic text-emerald-400 mt-2"
              >
                <i>Master’s in Data Science | AI/ML Enthusiast</i>
              </motion.h6>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.05 } }}
                viewport={{ once: true }}
                className="mt-10 text-zinc-300 max-w-2xl leading-loose"
              >
                <i>
                  "In a world racing with technology, I see data as the compass that brings direction. I love building
                  with it — whether it’s insights, models, or curiosity-driven experiments. What excites me most is how
                  rapidly technology is evolving, and I thrive on keeping pace, mastering new ways to create solutions
                  that are more intelligent, faster, and truly useful. Over time, this journey has shaped my ability to
                  decode human behavior by integrating data with technology — a craft I continue to refine every day."
                </i>
              </motion.p>

              {/* CTA row */}
              <div className="mt-10 flex flex-wrap items-start gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href="Resume_Sayali Sawant_AI.pdf"
                      download
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-zinc-800 text-zinc-200 text-sm hover:border-sky-500 hover:text-white transition w-fit flex-none whitespace-nowrap"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                      </svg>
                      <span>Download Resume</span>
                    </a>

                    <a
                      href="mailto:sayalis2024@gmail.com"
                      className="p-2 rounded-md border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition"
                      aria-label="Email"
                      title="Email Sayali"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 6l-10 7L2 6" />
                        <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
                      </svg>
                    </a>

                    <div className="flex items-center gap-3">
                      <a
                        href="https://www.linkedin.com/in/sayalisawant11/"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition"
                        aria-label="LinkedIn"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/SayaliSawant0101"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition"
                        aria-label="GitHub"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.9 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.09.81 2.2v3.26c0 .32.22.69.83.57A12 12 0 0 0 12 .5z" />
                        </svg>
                      </a>

                      {/* SHOW SKILLS SLIDER TRIGGER */}
                      <SkillsSlideInPanelInline />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-sm text-white-300 m-0 whitespace-nowrap">Want to skip the scroll?</p>
                    <a
                      href="https://resumechatbot.netlify.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" />
                      </svg>
                      <span className="text-sm">Chat with my AI Assistant</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative flex justify-center z-0 "
            >
              <img src="/me.png" alt="Sayali avatar" className="w-[500px] max-w-full h-auto object-contain" />
              <div
                className="pointer-events-none absolute inset-0 blur-3xl opacity-20 -z-10"
                style={{ background: "radial-gradient(500px 300px at 60% 40%, rgba(16,185,129,.35), transparent 60%)" }}
              />
            </motion.div>
          </div>
        </section>

        {/* -------------------------- EXPERIENCE --------------------------- */}
        <Section id="experience" title="Professional Experience" subtitle="Stories of turning raw data into business wins — explore my journey below.">
          {(() => {
            const JOBS = [
              {
                key: "agr",
                company: "AGR Knowledge Services Pvt Ltd.",
                city: "Mumbai, India",
                period: "Dec 2021 – Jun 2024",
                roles: [
                  {
                    title: "Senior Analyst (Business Intelligence)",
                    bullets: [
                      "Built classification & clustering models to reveal adoption gaps; helped a retail client grow market share by 6%.",
                      "Launched reusable analytics framework (SQL/Python/Tableau) for brand health reporting enabling consistant reporting across 7+ clients and reduceing turnaround by 40%.",
                      "Served as SME for two clients; streamlined data collection, transformation, and reporting; optimized data models for decision-making.",
                    ],
                    more: [
                      "Deployed churn models and behavior-based customer segments to target at-risk users, cutting churn by 18% in 3 months.",
                      "Performed trend analysis and forecasting (Prophet, SQL) integrating market-potential, share, and segment estimations to drive faster go-to-market insights.",
                      "Led market deep-dive study with model-driven predictions to size opportunities and shape pricing, new lines, and partnerships—supporting clients’ go-to-market and market-penetration strategies",
                    ],
                  },
                  {
                    title: "Analyst (Market Research)",
                    bullets: [
                      "Built customer segmentation and conversion-probability models across performance-marketing data and omnichannel sales data, improving marketing ROI by 15%.",
                      "Automated data cleanup and performed statistical analysis across marketing, sales, and customer data to uncover performance drivers and validate insights for decision support",
                      "Led requirements gathering sessions with stakeholders; aligned KPIs and success metrics with business goals.",
                    ],
                    more: [
                      "Automated a Net Promoter Score (NPS) analytics pipeline in Python, cutting manual effort 40% and accelerating insight turnaround.",
                      "Developed a Tableau sales dashboard with product, pricing, regions, competitors and value-chain views—enhancing end-to-end visibility and guiding smarter planning",
                    ],
                  },
                ],
              },
              {
                key: "whitehat",
                company: "WhiteHat Education Technology Pvt Ltd.",
                city: "Mumbai, India",
                period: "Jun 2020 – Dec 2021",
                roles: [
                  {
                    title: "Coding Instructor",
                    bullets: [
                      "Delivered 800+ coding classes to students aged 8–11; trial conversion > 21%.",
                      "Mentored students on logic building and coding practices.",
                      "Supervised and coached a team of 5 coding instructors—standardizing delivery, boosting engagement, and improving student satisfaction and retention",
                    ],
                    more: [],
                  },
                ],
              },
              {
                key: "mrvc",
                company: "Mumbai Railway Vikas Corporation Ltd. (MRVC)",
                city: "Mumbai, India",
                period: "Feb 2016 – Aug 2018",
                roles: [
                  {
                    title: "Business Analyst",
                    bullets: [
                      "Supported e-office software rollout; adopted by 300+ MRVC employees.",
                      "Monitored the live app and handled tech support—triaged performance issues and resolved user tickets",
                      "Refined scope and JIRA stories; improved sprint efficiency and accelerating releases.",
                    ],
                    more: [
                      "Analyzed fares/crowding/behavior with Tableau/Excel across millions of rows and translated results into clear, executive-ready presentations and dashboards",
                      "Applied digital-transformation fixes to hiring, employee-data, and filing workflows—streamlining manual processes and improving operational efficiency.",
                    ],
                  },
                ],
              },
            ];

            const [expanded, setExpanded] = useState({});
            const toggle = (key) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

            const [active, setActive] = useState(JOBS[0].key);
            const selected = JOBS.find((j) => j.key === active) || JOBS[0];

            const STAGGER_LOCAL = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
            const ITEM_LOCAL = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

            return (
              <div className="mt-8 space-y-8">
                {/* Company Pills */}
                <motion.div
                  className="flex justify-center flex-wrap gap-3 overflow-x-auto px-2"
                  variants={STAGGER_LOCAL}
                  initial="hidden"
                  animate="show"
                >
                  {JOBS.map((j) => (
                    <motion.button
                      key={j.key}
                      variants={ITEM_LOCAL}
                      onClick={() => setActive(j.key)}
                      aria-pressed={active === j.key}
                      className={[
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition border",
                        "whitespace-nowrap leading-tight overflow-hidden",
                        "focus:outline-none focus:ring-2 focus:ring-emerald-400/60",
                        active === j.key
                          ? "bg-emerald-600/90 text-white border-emerald-500 shadow-[0_0_22px] shadow-emerald-500/30"
                          : "bg-zinc-900/70 text-zinc-300 border-zinc-700 hover:bg-zinc-800",
                      ].join(" ")}
                    >
                      <Briefcase className="w-4 h-4 flex-none" />
                      <span className="truncate max-w-[22ch] md:max-w-none">{j.company}</span>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Details Card */}
                <motion.div
                  key={selected.key}
                  className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-950/60 backdrop-blur-sm shadow-[0_10px_60px_-20px_rgba(0,0,0,0.6)]"
                  variants={ITEM_LOCAL}
                  initial="hidden"
                  animate="show"
                >
                  <div className="p-6 md:p-8 flex flex-col gap-6">
                    {/* Header row */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <h3 className="text-2xl md:text-3xl font-bold">{selected.company}</h3>
                      <div className="flex items-center gap-4 text-emerald-400">
                        <div className="inline-flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">{selected.period}</span>
                        </div>
                        <div className="hidden md:inline-flex items-center gap-2 text-emerald-400/80">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{selected.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Roles */}
                    <motion.div className="flex flex-col gap-6" variants={STAGGER_LOCAL} initial="hidden" animate="show">
                      {selected.roles.map((r) => {
                        const roleKey = `${selected.key}-${r.title}`;
                        const isOpen = !!expanded[roleKey];

                        const base = r.bullets || [];
                        const extra = r.more || [];
                        const hasOverflow = base.length > 3 || extra.length > 0;

                        const visibleBullets = isOpen ? [...base, ...extra] : base.slice(0, 3);

                        return (
                          <motion.div key={roleKey} variants={ITEM_LOCAL} className="space-y-3">
                            <p className="text-lg font-semibold text-zinc-100">{r.title}</p>

                            <ul className="space-y-2">
                              {visibleBullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <CheckCircle2 className="mt-0.5 w-4 h-4 text-emerald-400 shrink-0" />
                                  <span className="text-sm text-zinc-300">{b}</span>
                                </li>
                              ))}
                            </ul>

                            {hasOverflow && (
                              <button
                                type="button"
                                onClick={() => toggle(roleKey)}
                                aria-expanded={isOpen}
                                className="mt-1 inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 underline decoration-dotted"
                              >
                                {isOpen ? (
                                  <>
                                    Read less
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M18 15l-6-6-6 6" />
                                    </svg>
                                  </>
                                ) : (
                                  <>
                                    Read more
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M6 9l6 6 6-6" />
                                    </svg>
                                  </>
                                )}
                              </button>
                            )}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </Section>

        {/* ==== Projects & Experiments (drop-in, title-safe) ==== */}
        <Section
          id="projects"
          title="Projects & Experiments"
          subtitle="A showcase of hands-on data, AI, and machine learning projects — from exploration to execution."
        >
          {(() => {
            const PROJECTS_RAW = [
              {
                id: "instacart-intelligence",
                title: "An AI-driven conversational resume chatbot",
                desc:
                  " A full-stack RAG chatbot (FastAPI, FAISS + MiniLM) with OpenAI gpt-4o-mini replacing static resumes, delivering fast, context-aware answers to queries while showcasing end-to-end technical capability.",
                tech: ["FastAPI", "FAISS", "all-MiniLM-L6-v2", "OpenAI gpt-4o-mini"],
                readUrl:
                  "https://github.com/SayaliSawant0101/Instacart-Customer-Intelligence/blob/main/README.md",
                codeUrl: "https://resumechatbot.netlify.app/",
                img: "8.jpg",
                alt: "Resume chatbot thumbnail",
              },
              {
                title: "LLM-powered social listening system",
                desc:
                  "End-to-end pipeline on tweets using AWS S3 / Glue / Athena; delivers sentiment analysis (twitter-roberta-base-sentiment), Aspect based sentiment analysis (bart-large-mnli), theme based clusters via BERTopic (e5-base-v2) with GPT-4o-mini, and executive summaries - delivering interactive summary report for stakeholders",
                tech: [
                  "ETL",
                  "OpenAI gpt-4o-mini",
                  "LLM",
                  "NLP",
                  "Sentiment Analysis",
                  "LLM Summary",
                  "Aspect/Theme Analysis",
                ],
                readUrl: "https://github.com/SayaliSawant0101/LLM-powered-social-listening-system",
                img: "10.jpeg",
                alt: "Social listening thumbnail",
              },
              {
                id: "imdb-sentiment",
                title: "Customer Intelligence & Reorder Prediction System",
                desc:
                  "A LightGBM reorder prediction model (ROC-AUC ≈ 0.84) to make next basket suggestions. Segmented customers via unsupervised learning for precision marketing, applied Association Rules for bundling, and built a Word2Vec recommendation engine that helps product discovery and upsell & cross-sell opportunities",
                tech: ["XGBoost", "LightGBM", "CatBoost", "SHAP", "KMeans", "PCA", "DBSCAN", "Apriori", "Word2Vec"],
                readUrl:
                  "https://github.com/SayaliSawant0101/Instacart-Customer-Intelligence/blob/main/README.md",
                img: "2.png",
                alt: "Instacart project thumbnail",
              },
            ];

            const slugify = (s) =>
              (s || "")
                .toString()
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");

            const PROJECTS = PROJECTS_RAW.map((p, idx) => {
              const baseId = p.id || slugify(p.title || `project-${idx + 1}`);
              const safeId = `${baseId}-${idx}`;
              return {
                id: safeId,
                _dataId: p.id || baseId,
                title: p.title || "Untitled Project",
                desc: p.desc || "",
                tech: Array.isArray(p.tech) ? p.tech : [],
                readUrl: p.readUrl || "",
                codeUrl: p.codeUrl || "",
                img: p.img || "",
                alt: p.alt || p.title || "Project thumbnail",
              };
            });

            const STAGGER_SAFE =
              typeof STAGGER !== "undefined"
                ? STAGGER
                : { hidden: { opacity: 1 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.04 } } };

            const ITEM_SAFE =
              typeof ITEM !== "undefined"
                ? ITEM
                : { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

            const Tech = ({ children }) => (
              <span className="px-2.5 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-xs text-emerald-300">
                {children}
              </span>
            );

            const FALLBACK = "/projects/placeholder.jpg";

            return (
              <motion.div
                className="grid md:grid-cols-3 gap-6 items-stretch"
                variants={STAGGER_SAFE}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {PROJECTS.map((p) => (
                  <motion.div key={p.id} variants={ITEM_SAFE}>
                    <div className="group h-full rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-sky-500/60 hover:shadow-[0_0_60px_-20px_rgba(56,189,248,0.65)]">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold">{p.title}</h3>
                      </div>

                      <div className="mt-4 overflow-hidden rounded-xl">
                        <img
                          loading="lazy"
                          src={p.img || FALLBACK}
                          alt={p.alt}
                          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          onError={(e) => {
                            if (FALLBACK && e.currentTarget.src !== FALLBACK) {
                              e.currentTarget.src = FALLBACK;
                            }
                          }}
                        />
                      </div>

                      {p.desc ? <p className="mt-4 text-sm text-gray-300">{p.desc}</p> : null}

                      {p.tech.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.tech.map((t, i) => (
                            <Tech key={`${p.id}-tech-${i}`}>{t}</Tech>
                          ))}
                        </div>
                      )}

                      {(p.readUrl || p.codeUrl) && (
                        <div className="mt-6 flex gap-2">
                          {p.readUrl ? (
                            typeof Button !== "undefined" ? (
                              <Button size="sm" variant="secondary" asChild>
                                <a href={p.readUrl} target="_blank" rel="noreferrer">
                                  Read on GitHub
                                </a>
                              </Button>
                            ) : (
                              <a
                                href={p.readUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-md border border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-800"
                              >
                                Read on GitHub
                              </a>
                            )
                          ) : null}

                          {p.codeUrl ? (
                            typeof Button !== "undefined" ? (
                              <Button size="sm" variant="secondary" asChild>
                                <a href={p.codeUrl} target="_blank" rel="noreferrer">
                                  Launch App
                                </a>
                              </Button>
                            ) : (
                              <a
                                href={p.codeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-md border border-zinc-700 px-3 py-1.5 text-sm hover:bg-zinc-800"
                              >
                                Launch App
                              </a>
                            )
                          ) : null}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            );
          })()}
        </Section>

        {/* ------------------------------ BLOGS ---------------------------- */}
        <Section
          id="blog"
          title="Thoughts, Knowledge, and a Perspective"
          subtitle="A mix of what I’ve learned, what I’m curious about, and what I see changing in the world of data and AI."
        >
          {(() => {
            const allPosts = useMemo(() => {
              try {
                return getAllPosts();
              } catch (e) {
                console.error("[Home] getAllPosts failed:", e);
                return [];
              }
            }, []);

            const toDate = (d) => {
              if (!d) return null;
              const t = new Date(d);
              return isNaN(+t) ? null : t;
            };
            const labelDate = (dt) =>
              dt ? dt.toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "—";
            const readTime = (txt) => {
              const words = (txt || "").trim().split(/\s+/).length || 200;
              return Math.max(1, Math.round(words / 200)) + " min read";
            };

            const posts = useMemo(() => {
              const list = [...allPosts].map((p) => {
                let dt = toDate(p.date);
                if (!dt) {
                  const m = (p.slug || "").match(/\d{4}-\d{2}-\d{2}/);
                  if (m) dt = toDate(m[0]);
                }
                return { ...p, __date: dt, __dateLabel: labelDate(dt), __read: readTime(p.excerpt) };
              });
              list.sort((a, b) => (b.__date ? +b.__date : 0) - (a.__date ? +a.__date : 0));
              return list.slice(0, 3);
            }, [allPosts]);

            const CardPost = ({ post }) => (
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm transition-all duration-500 overflow-hidden hover:border-sky-400/60 hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.6)] hover:scale-[1.02]"
              >
                {post.image ? (
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] w-full bg-gradient-to-br from-zinc-900 to-zinc-800" />
                )}

                <div className="p-6">
                  <h3 className="text-xl font-semibold leading-snug text-zinc-100 group-hover:text-white transition-colors">
                    {post.title || post.slug}
                  </h3>

                  <div className="mt-3 flex items-center justify-between text-sm text-emerald-300 group-hover:text-emerald-700 transition-colors">
                    <span>{post.__dateLabel}</span>
                    <span>{post.__read}</span>
                  </div>
                </div>
              </Link>
            );

            return posts.length ? (
              <>
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
                  variants={STAGGER}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {posts.map((p) => (
                    <motion.div key={p.slug} variants={ITEM} className="h-full">
                      <CardPost post={p} />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex justify-center mt-8"
                  variants={STAGGER}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.div variants={ITEM}>
                    <Button variant="outline" asChild>
                      <Link to="/blog">View all posts</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </>
            ) : (
              <div className="text-center text-zinc-400">
                No posts yet. Add markdown files under <code>/posts</code> and they’ll appear here.
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link to="/blog">Go to blog</Link>
                  </Button>
                </div>
              </div>
            );
          })()}
        </Section>

        {/* ------------------------------ EDUCATION ------------------------ */}
        <Section id="education" title="Academic Background" subtitle="The foundation that built my path.">
          {(() => {
            const EDU = [
              {
                key: "pace",
                name: "Master of Science in Data Science",
                url: "https://www.pace.edu/",
                degree: "Pace University",
                school: "Seidenberg School of Computer Science and Information Systems",
                city: "New York, USA",
                period: "2024 – 2025",
                highlight: "GPA: 3.9",
                courses: ["Scalable Databases", "Machine Learning", "Data Mining", "Practical Data Science", "Algrithum for Data Science"],
              },
              {
                key: "gtu",
                name: "Master of Business Administration (MBA)",
                url: "https://mu.ac.in/",
                degree: "University of Mumbai",
                school: "St. Francis Institute of Management Studies and Research",
                city: "Mumbai, India",
                period: "2018 – 2020",
                highlight: "CGPA: 8.9/10",
                courses: [
                  "Consumer Behavior",
                  "Organization Behavior",
                  "Human Resource Management",
                  "Marketing Management",
                  "International Business",
                  "Finance & Economics",
                  "Strategic Management",
                ],
              },
              {
                key: "mu",
                name: "Bachelor of Engineering in Computers",
                url: "https://mu.ac.in/",
                degree: "University of Mumbai",
                school: "Viva Institute of Technology",
                city: "Mumbai, India",
                period: "2011 – 2015",
                highlight: "CGPA: 3/4",
                courses: [
                  "Computer Architecture",
                  "Data Structures and Algorithms",
                  "Embedded Systems",
                  "Operating Systems",
                  "Computer Networks",
                  "Robotics and Automation",
                ],
              },
            ];

            const [active, setActive] = useState(EDU[0].key);
            const selected = EDU.find((e) => e.key === active) || EDU[0];

            const STAGGER_LOCAL = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
            const ITEM_LOCAL = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

            return (
              <div className="mt-8 space-y-8">
                {/* University pills */}
                <motion.div className="flex justify-center flex-wrap gap-3" variants={STAGGER_LOCAL} initial="hidden" animate="show">
                  {EDU.map((u) => (
                    <motion.button
                      key={u.key}
                      variants={ITEM_LOCAL}
                      onClick={() => setActive(u.key)}
                      aria-pressed={active === u.key}
                      className={[
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition border",
                        "focus:outline-none focus:ring-2 focus:ring-emerald-400/60",
                        active === u.key
                          ? "bg-emerald-600/90 text-white border-emerald-500 shadow-[0_0_22px] shadow-emerald-500/30"
                          : "bg-zinc-900/70 text-zinc-300 border-zinc-700 hover:bg-zinc-800",
                      ].join(" ")}
                    >
                      <School className="w-4 h-4" />
                      {u.name}
                    </motion.button>
                  ))}
                </motion.div>

                {/* Degree card */}
                <motion.div
                  key={selected.key}
                  className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-950/60 backdrop-blur-sm shadow-[0_10px_60px_-20px_rgba(0,0,0,0.6)]"
                  variants={ITEM_LOCAL}
                  initial="hidden"
                  animate="show"
                >
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <h3 className="text-2xl md:text-3xl font-bold">{selected.degree}</h3>
                      <div className="flex items-center gap-4 text-emerald-400">
                        <div className="inline-flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">{selected.period}</span>
                        </div>
                        <div className="hidden md:inline-flex items-center gap-2 text-emerald-400/80">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{selected.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* University + school */}
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-lg md:text-xl font-semibold text-emerald-300 hover:text-emerald-200 transition"
                    >
                      {selected.name}, {selected.school}
                    </a>

                    {/* Highlight */}
                    {selected.highlight && (
                      <div className="flex items-start gap-2 text-zinc-200">
                        <CheckCircle2 className="mt-0.5 w-5 h-5 text-emerald-400 shrink-0" />
                        <span className="text-sm md:text-base">{selected.highlight}</span>
                      </div>
                    )}

                    {/* Divider */}
                    <div className="border-t border-zinc-800 pt-4" />

                    {/* Courses */}
                    <div>
                      <p className="text-sm font-semibold text-zinc-300 mb-3">Relevant Coursework</p>
                      <motion.div className="flex flex-wrap gap-2" variants={STAGGER_LOCAL} initial="hidden" animate="show">
                        {selected.courses.map((c) => (
                          <motion.span
                            key={c}
                            variants={ITEM_LOCAL}
                            className="inline-flex items-center gap-2 rounded-full border border-zinc-700/70 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-200"
                          >
                            <span className="inline-block size-1.5 rounded-full bg-emerald-400/80" />
                            {c}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </Section>

        {/* ------------------------------ CONTACT -------------------------- */}
        <Section
          id="contact"
          title="Let's Connect"
          subtitle="Open to collaborations, conversations, and opportunities — connect with me here."
        >
          <motion.div
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-20 pb-40"
            variants={STAGGER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Email */}
            <motion.div variants={ITEM}>
              <a
                href="mailto:sayalis2024@gmail.com"
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6 hover:border-sky-500/60 hover:shadow-[0_0_60px_-20px_rgba(56,189,248,0.65)] transition-all duration-300 block"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="grid place-items-center w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-xs text-zinc-400">sayalis2024@gmail.com</div>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* LinkedIn */}
            <motion.div variants={ITEM}>
              <a
                href="https://www.linkedin.com/in/sayalisawant11/"
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6 hover:border-sky-500/60 hover:shadow-[0_0_60px_-20px_rgba(56,189,248,0.65)] transition-all duration-300 block"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="grid place-items-center w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">LinkedIn</div>
                    <div className="text-xs text-zinc-400">/in/sayalisawant11</div>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* GitHub */}
            <motion.div variants={ITEM}>
              <a
                href="https://github.com/SayaliSawant0101"
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6 hover:border-sky-500/60 hover:shadow-[0_0_60px_-20px_rgba(56,189,248,0.65)] transition-all duration-300 block"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="grid place-items-center w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.9 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.09.81 2.2v3.26c0 .32.22.69.83.57A12 12 0 0 0 12 .5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">GitHub</div>
                    <div className="text-xs text-zinc-400">SayaliSawant0101</div>
                  </div>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </Section>

        {/* ------------------------------ FOOTERS -------------------------- */}
        <footer className="mt-50 border-t border-zinc-800/80 py-4">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">Sayali Sawant</h3>
              <p className="mt-2 text-sm text-zinc-400 max-w-2xl mx-auto">
                On a journey from data to intelligence — exploring opportunities in AI, ML and DL.
              </p>

              <motion.div
                className="mt-5 flex items-center justify-center gap-4"
                variants={STAGGER}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.a
                  variants={ITEM}
                  href="mailto:sayalis2024@gmail.com"
                  className="p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition"
                  aria-label="Email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </motion.a>
                <motion.a
                  variants={ITEM}
                  href="https://www.linkedin.com/in/sayalisawant11/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </motion.a>
                <motion.a
                  variants={ITEM}
                  href="https://github.com/SayaliSawant0101"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.9 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.09.81 2.2v3.26c0 .32.22.69.83.57A12 12 0 0 0 12 .5z" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>

            <div className="mt-8 text-center text-xs text-zinc-500">
              © {new Date().getFullYear()} Sayali Sawant. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Quick links footer */}
        <footer className="border-t border-zinc-800 py-8">
          <div className="max-w-6xl mx-auto px-6 text-sm text-zinc-400 flex items-center justify-between">
            <p />
            <div className="flex gap-4">
              <a href="#home" className="hover:text-white">Top</a>
              <a href="#experience" className="hover:text-white">Professional Experience</a>
              <a href="#education" className="hover:text-white">Academic Background</a>
              <a href="#projects" className="hover:text-white">Projects</a>
              <a href="#blog" className="hover:text-white">Blogs</a>
              <a href="#contact" className="hover:text-white">Contact</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
