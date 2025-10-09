// App.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // optional (contact forms later)
import { Badge } from "@/components/ui/badge"; // optional

import InteractiveBackground from "@/components/InteractiveBackground";

// Icons
import {
  Mail, Github, Linkedin,
  Calendar, GraduationCap, School, CheckCircle2, Briefcase, MapPin,
  Cpu, Database, ServerCog, BarChart3, Cloud, Workflow, Sparkles
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
    <section id={id} className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center"
        >
          <motion.h1 variants={ITEM} className="text-5xl md:text-5xl font-extrabold text-center text-sky-400 drop-shadow-[0_0_4px_rgba(56,189,248,0.6)]">
            <span className="relative inline-block">
    {/* Fallback (always visible) */}
    <span className="relative z-10">
            {title}
            </span>
            <span
      aria-hidden
      className="absolute inset-0 bg-gradient-to-r from-sky-400 to-emerald-300
                 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]"
    >
      {title}
    </span>
    <br></br>
  
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

/* -------------------------------------------
   App (keep section sequence unchanged)
-------------------------------------------- */
export default function App() {
  // Smooth anchor scroll for in-page links
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

  return (
    <div className="min-h-screen text-zinc-100 relative">
      {/* Interactive constellation + cursor spotlight */}
      <InteractiveBackground />

      <main className="relative z-10">






        {/* ------------------------------ NAV ------------------------------ */}

        <header className="sticky top-0 z-40 bg-zinc-950/70 backdrop-blur border-b border-zinc-800/80">
  <div className="relative max-w-7xl mx-auto h-16">
    {/* Left: logo */}
    <div className="h-full flex items-center px-6">
      <a href="#home" className="text-lg font-extrabold tracking-tight text-emerald-300">SS</a>
    </div>

    {/* Right: buttons (pinned) */}
    <nav className="absolute right-1 top-12 -translate-y-1/2 flex items-center gap-2">
      {/* Home */}
      <a
        href="#home"
        className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12l9-9 9 9" /><path d="M9 21V9h6v12" />
        </svg>
        Home
      </a>




{/* Portfolio with Dropdown (fixed hover) */}
<div className="relative group">
  <a className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition text-sm">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
      <path d="M3 10h18a2 2 0 0 1 2 2v5a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-5a2 2 0 0 1 2-2z" />
    </svg>
    Portfolio
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </a>

  {/* The key: -mt-2 on menu and pt-2 on wrapper to overlap, removing the hover gap */}
  <div className="absolute left-0 pt-2">
    <div className="hidden group-hover:block -mt-2 w-52 rounded-lg border border-zinc-800 bg-zinc-900 shadow-lg overflow-hidden">
      <a href="#skills" className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white">Skills</a>
      <a href="#experience" className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white">Professional Experience</a>
      <a href="#projects" className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white">Projects</a>
    </div>
  </div>
</div>








{/* Blogs */}
      <a
        href="#blog"
        className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-3h2l2 3h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z" />
        </svg>
        Blogs
      </a>







      {/* Education */}
      <a
        href="#education"
        className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10l-10-6-10 6 10 6 10-6z" />
        </svg>
        Education
      </a>











{/* Contact */}
<a
  href="#contact"
  className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition text-sm"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16v16H4z" stroke="none" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
  <span>Contact</span>
</a>





    </nav>
  </div>
</header>






        {/* ------------------------------ HERO ----------------------------- */}
        {/* Hero */}
<section id="home" className="relative pt-24 md:pt-28">
  {/* keep global interactive background */}

  {/* 3 columns on lg+: [text | image | buttons] */}
  <div className="w-full px-6 md:px-12 lg:px-22 flex justify-end gap-12 items-start">
    {/* 1) LEFT: TEXT */}
    <div className="pl-20 md:pl-20">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-montserrat font-bold leading-loose tracking-tight"
      >
        Hi, I’m <span className="font-montserrat font-extrabold text-sky-400 drop-shadow-[0_0_4px_rgba(56,189,248,0.6)]">Sayali</span></motion.h1>
<br />
        <motion.h6 initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: true }} 
        className="text-4xl font-light italic text-emerald-400 mt-2"><i>Master’s in Data Science | AI/DL Enthusiast</i>
      </motion.h6>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.05 } }}
        viewport={{ once: true }}
        className="mt-10 text-zinc-300 max-w-2xl leading-loose"
      >
        <i>"In a world racing with technology, I see data as the compass that brings direction. I love building with it — whether it’s insights, models, or curiosity-driven experiments — and transforming complexity into intelligent solutions that feel almost magical. What excites me most is how rapidly technology is evolving, and I thrive on keeping pace, mastering new ways to create solutions that are more intelligent, faster, and truly useful. Over time, this journey has shaped my ability to decode human behavior by integrating data with technology — a craft I continue to refine every day."
</i>
      </motion.p>

      {/* CTA row */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href="Resume_Sayali Sawant_AI.pdf"
          download
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 text-zinc-200 hover:border-sky-500 hover:text-white transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
          </svg>
          <span>Download Resume</span>
        </a>

        <a href="mailto:sayalis2024@gmail.com" className="p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition" aria-label="Email">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 6l-10 7L2 6"/><rect x="2" y="6" width="20" height="12" rx="2" ry="2"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/sayalisawant11/" target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
        <a href="https://github.com/SayaliSawant0101" target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition" aria-label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.9 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.09.81 2.2v3.26c0 .32.22.69.83.57A12 12 0 0 0 12 .5z"/>
          </svg>
        </a>
      </div>
    </div>

    {/* 2) MIDDLE: IMAGE */}
    <motion.div
      initial={{ opacity: 0, scale: .95 }}
      whileInView={{ opacity: 1, scale: 1, transition: { duration: .6 } }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative flex justify-center z-0"
    >
      <img
        src="/me.png"
        alt="Sayali avatar"
        className="w-[500px] max-w-full h-auto object-contain"
      />
      <div
        className="pointer-events-none absolute inset-0 blur-3xl opacity-20 -z-10"
        style={{ background: "radial-gradient(500px 300px at 60% 40%, rgba(16,185,129,.35), transparent 60%)" }}
      />
    </motion.div>

    {/* 3) RIGHT: QUICK NAV BUTTONS */}

  </div>
</section>









        {/* ------------------------------ SKILLS ---------------------------- */}
          <Section id="skills" title="Skills Snapshot" subtitle="Core capabilities that drive my journey">
          {(() => {
            const SKILLS = [
              { key: "ds", title: "Data Science", icon: Cpu, accent: "from-emerald-400/25 to-sky-400/25",
                tools: ["Python", "scikit-learn", "XGBoost", "LightGBM","CATBoost", "SHAP","Linear Regression","Logistic Regression","KNN","KMeans","DBSCAN","Prophet","Decision Tree","Random Forest"],
                notes: "EDA • Feature Engineering • Model Building • Model Evaluation • Model Tuning" },
              { key: "mlops", title: "AI & DL", icon: ServerCog, accent: "from-violet-400/25 to-fuchsia-400/25",
                tools: ["FastAPI", "OpenAPI", "Pytorch", "TensorFlow", "Keras", "Hugging Face","Transformers", "CNN","RNN","BERT","RoBERTa", "LSTM","GRU","LoRa"],
                notes: "Model Training • Fine-tuning • Embeddings " },
              { key: "analytics", title: "Analytics & Viz", icon: BarChart3, accent: "from-amber-400/25 to-rose-400/25",
                tools: ["SQL","NoSQL", "Tableau", "Power BI", "Plotly", "Matplotlib","Excel"],
                notes: "BI dashboards • Stakeholder reporting" },
              { key: "data", title: "Data Platforms", icon: Database, accent: "from-cyan-400/25 to-emerald-400/25",
                tools: ["PostgreSQL", "BigQuery", "Snowflake", "S3", "MySQL", "MongoDB","Hive"],
                notes: "Data pipelines (ETL/ELT) • Data warehousing • Query optimization • Schema design" },
              { key: "cloud", title: "Cloud", icon: Cloud, accent: "from-sky-400/25 to-blue-400/25",
                tools: ["AWS", "S3", "EC2", "Lambda", "API Gateway", "CloudWatch", "Glue", "Athena", "Redshift"],
                notes: "Serverless • Deployments • Monitoring" },
              { key: "workflow", title: "Workflow", icon: Workflow, accent: "from-indigo-400/25 to-emerald-400/25",
                tools: ["Git","GitHub", "JIRA"],
                notes: "Agile & Scrum workflows • Requirement gathering • Business process modeling • Workflow automation • Version control • Collaboration across teams Teams" },
            ];

            const SkillCard = ({ title, Icon, tools, notes, accent }) => (
              <div className={`group relative rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6
                             hover:border-sky-500/60 hover:shadow-[0_0_60px_-20px_rgba(56,189,248,0.65)]
                             transition-all duration-300 block relative h-full rounded-2xl bg-gradient-to-br ${accent} p-[1px] transition-transform duration-300 hover:-translate-y-1`}>
                <div className="h-full rounded-2xl bg-zinc-950/80 backdrop-blur border border-zinc-800/80">
                  <div className="p-5 md:p-6 flex flex-col h-full gap-4">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex size-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800">
                        <Icon className="w-5 h-5 text-zinc-200" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold tracking-tight hover:drop-shadow-[0_0_30px_rgba(56,189,248,0.65)]">{title}</h3>
                      <Sparkles className="ml-auto w-5 h-5 text-sky-300/70 animate-pulse" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tools.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full border border-zinc-700/70 bg-zinc-900/70 text-xs text-zinc-200">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs italic text-teal-400 mt-auto">{notes}</p>
                  </div>
                </div>
              </div>
            );

            return (
              <motion.div
                className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch"
                variants={STAGGER}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {SKILLS.map((s) => (
                  <motion.div key={s.key} variants={ITEM}>
                    <SkillCard title={s.title} Icon={s.icon} tools={s.tools} notes={s.notes} accent={s.accent} />
                  </motion.div>
                ))}
              </motion.div>
            );
          })()}
        </Section>











        {/* -------------------------- EXPERIENCE (Tabbed) ------------------- */}
      
<Section
  id="experience"
  title="Professional Experience"
  subtitle="Stories of turning raw data into business wins — explore my journey below."
>
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
              "Built customer segmentation and conversion-probability models (LogReg, XGBoost) across performance-marketing data and omnichannel sales data, improving marketing ROI by 15%.",
              "SME for two clients: streamlined data collection, transformation, and reporting; optimized data models for decision-making."
            ],
            more: [
              "Deployed churn models and behavior-based customer segments to target at-risk users, cutting churn by 18% in 3 months.",
              "Ran trend analysis and forecasting (Prophet, SQL) integrating market-potential, share, and segment estimations to drive faster go-to-market insights.",
              "Led market deep-dive study with model-driven predictions to size opportunities and shape pricing, new lines, and partnerships—supporting clients’ go-to-market and market-penetration strategies"
            ]
          },
          {
            title: "Analyst (Market Research)",
            bullets: [
              "Launched reusable analytics framework (SQL/Python/Tableau) for brand health reporting enabling consistant reporting across 7+ clients and reduceing turnaround by 40%.",
              "Automated data cleanup and performed statistical analysis across marketing, sales, and customer data to uncover performance drivers and validate insights for decision support",
              "Led requirements gathering sessions with stakeholders; aligned KPIs and success metrics with business goals."  
            ],
            more: [
              "Automated a Net Promoter Score (NPS) analytics pipeline in Python, cutting manual effort 40% and accelerating insight turnaround.",
              "Developed a Tableau sales dashboard with product, pricing, regions, competitors and value-chain views—enhancing end-to-end visibility and guiding smarter planning"
            ]
          }
        ]
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
              "Supervised and coached a team of 5 coding instructors—standardizing delivery, boosting engagement, and improving student satisfaction and retention"
            ],
            more: [
              
            ]
          }
        ]
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
              "Refined scope and JIRA stories; improved sprint efficiency and accelerating releases."
            ],
            more: [
              "Analyzed fares/crowding/behavior with Tableau/Excel across millions of rows and translated results into clear, executive-ready presentations and dashboards",
              "Applied digital-transformation fixes to hiring, employee-data, and filing workflows—streamlining manual processes and improving operational efficiency."
            ]
          }
        ]
      }
    ];

    // expanded/collapsed state keyed by job+role to keep stable across tab switches
    const [expanded, setExpanded] = React.useState({});
    const toggle = (key) =>
      setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

    const [active, setActive] = React.useState(JOBS[0].key);
    const selected = JOBS.find((j) => j.key === active) || JOBS[0];

    // Simple stagger variants (can be your STAGGER/ITEM if already defined)
    const STAGGER = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
    const ITEM = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

    return (
      <div className="mt-8 space-y-8">
        {/* Company Pills */}
        <motion.div
          className="flex justify-center flex-wrap gap-3"
          variants={STAGGER}
          initial="hidden"
          animate="show"
        >
          {JOBS.map((j) => (
            <motion.button
              key={j.key}
              variants={ITEM}
              onClick={() => setActive(j.key)}
              aria-pressed={active === j.key}
              className={[
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition border",
                "focus:outline-none focus:ring-2 focus:ring-emerald-400/60",
                active === j.key
                  ? "bg-emerald-600/90 text-white border-emerald-500 shadow-[0_0_22px] shadow-emerald-500/30"
                  : "bg-zinc-900/70 text-zinc-300 border-zinc-700 hover:bg-zinc-800"
              ].join(" ")}
            >
              <Briefcase className="w-4 h-4" />
              {j.company}
            </motion.button>
          ))}
        </motion.div>

        {/* Details Card — force remount on tab switch to avoid view/animation glitches */}
        <motion.div
          key={selected.key}
          className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-950/60 backdrop-blur-sm shadow-[0_10px_60px_-20px_rgba(0,0,0,0.6)]"
          variants={ITEM}
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

            {/* Roles (staggered) */}
            <motion.div
              className="flex flex-col gap-6"
              variants={STAGGER}
              initial="hidden"
              animate="show"
            >
              {selected.roles.map((r) => {
                const roleKey = `${selected.key}-${r.title}`;
                const isOpen = !!expanded[roleKey];

                const base = r.bullets || [];
                const extra = r.more || [];
                const hasOverflow = base.length > 3 || extra.length > 0;

                // closed → first 3 base bullets; open → all base + extra
                const visibleBullets = isOpen ? [...base, ...extra] : base.slice(0, 3);

                return (
                  <motion.div key={roleKey} variants={ITEM} className="space-y-3">
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











{/* ------------------------------ PROJECTS -------------------------- */}
<Section id="projects" title="Projects & Experiemnts" subtitle="A showcase of hands-on data, AI, and machine learning projects — from exploration to execution.">
  {(() => {
    const PROJECTS = [  
      {
        title: "Shoppers behaviour prediction and intellince system",
        desc:
          "End-to-end customer intelligence project on the Instacart dataset — built reorder prediction models (XGBoost, LightGBM, CatBoost) with LightGBM selected as final (F1 ≈ 0.45, ROC-AUC ≈ 0.84), engineered customer segmentation (KMeans, DBSCAN), and developed market basket analysis and recommendation systems to drive personalization, retention, and growth.",
        tech: ["XGBoost","LightGBM","CatBoost","SHAP","KMeans","PCA","DBSCAN","Apriori","Word2Vec"],
        readUrl: "https://github.com/SayaliSawant0101/Instacart-Customer-Intelligence/blob/main/README.md",
        img: "2.png",
        alt: "Instacart project thumbnail",
      },
      {
        title: "Patient Segmentation and Program Prediction",
        desc:
          "Comprehensive analysis of NYS Patient Characteristics Survey data — built supervised models to predict mental health program utilization and applied unsupervised clustering (PCA + KMeans/DBSCAN) to segment patients, uncovering patterns that guide personalized care, targeted interventions, and efficient resource planning.",
        tech: ["EDA","Feature Engineering","Decision Tree","Random Forest","KMeans","DBSCAN"],
        readUrl: "#",
        img: "4.png",
        alt: "NPS churn/upsell project thumbnail",
      },
      {
        title: "IMDB Movie Review Sentiment Analyis",
        desc:
          "NLP pipeline on the IMDB dataset — built sentiment classification models (Logistic Regression, LSTM/GRU, DistilBERT) with DistilBERT selected as final (Accuracy ≈ 0.91, F1 ≈ 0.91), engineered preprocessing and explainability (TF-IDF features, token contribution analysis), and developed an interactive Gradio demo with Hugging Face deployment for real-time review predictions..",
        tech: ["Logistic Regression","TF-IDF features", "LSTM / GRU","Transformers (DistilBERT)","Word Embeddings","PyTorch","TensorFlow", "Hugging Face Spaces", "Gradio"],
        readUrl: "https://github.com/SayaliSawant0101/imdb-sentiment-analysis/blob/main/README.md",
        codeUrl: "https://huggingface.co/spaces/sayalis2024/imdb-sentiment-sayali",
        img: "6.png",
        alt: "School segmentation project thumbnail",
      },
    ];

    const Tech = ({ children }) => (
      <span className="px-2.5 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-xs text-emerald-300">
        {children}
      </span>
    );

    // Fallback image (optional)
    const FALLBACK = "/projects/placeholder.jpg"; // add a placeholder here if you want

    return (
      <motion.div
        className="grid md:grid-cols-3 gap-6 items-stretch"
        variants={STAGGER}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {PROJECTS.map((p) => (
          <motion.div key={p.title} variants={ITEM}>
            <div
              className="group h-full rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6
                         transition-all duration-300 hover:border-sky-500/60 hover:shadow-[0_0_60px_-20px_rgba(56,189,248,0.65)]"
            >
              {/* Title */}
              <center><h3 className="text-lg font-semibold">{p.title}</h3></center>

              {/* Image (unique per project) */}
              <div className="mt-4 overflow-hidden rounded-xl">
                <img
                  src={p.img || FALLBACK}
                  alt={p.alt || p.title}
                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  onError={(e) => { if (FALLBACK) e.currentTarget.src = FALLBACK; }}
                />
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-gray-300">{p.desc}</p>

              {/* Tech chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Tech key={t}>{t}</Tech>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-2">
                {p.readUrl && (
                  <Button size="sm" variant="secondary" asChild>
                    <a href={p.readUrl} target="_blank" rel="noreferrer">Read on GitHub</a>
                  </Button>
                )}
                {p.codeUrl && (
                  <Button size="sm" variant="secondary" asChild>
                    <a href={p.codeUrl} target="_blank" rel="noreferrer">Live Demo</a>
                  </Button>
                )}
              </div>
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
    // Load markdown posts generated by Netlify CMS
    const allPosts = React.useMemo(() => {
      try {
        return getAllPosts(); // [{ slug, title, date, excerpt, image, ... }]
      } catch (e) {
        console.error("[Home] getAllPosts failed:", e);
        return [];
      }
    }, []);

    // helpers
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

    // normalize → sort newest first → keep only 3 for home
    const posts = React.useMemo(() => {
      const list = [...allPosts].map((p) => {
        let dt = toDate(p.date);
        // Fallback: try to infer from slug YYYY-MM-DD
        if (!dt) {
          const m = (p.slug || "").match(/\d{4}-\d{2}-\d{2}/);
          if (m) dt = toDate(m[0]);
        }
        return {
          ...p,
          __date: dt,
          __dateLabel: labelDate(dt),
          __read: readTime(p.excerpt),
        };
      });
      list.sort((a, b) => ((b.__date ? +b.__date : 0) - (a.__date ? +a.__date : 0)));
      return list.slice(0, 3);
    }, [allPosts]);

    const Card = ({ post }) => (
      <Link
  to={`/blog/${post.slug}`}
  className="group block h-full rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm transition-all duration-500 overflow-hidden hover:border-sky-400/60 hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.6)] hover:scale-[1.02]"
>
        {/* Top image (if provided) */}
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

        {/* Body */}
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
              <Card post={p} />
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

<Section
  id="education"
  title="Academic Background"
  subtitle="The foundation that built my path."
>
  {(() => {
    const EDU = [
      {
        key: "pace",
        name: "Pace University",
        url: "https://www.pace.edu/",
        degree: "Master of Science in Data Science",
        school: "Seidenberg School of Computer Science and Information Systems",
        city: "New York, USA",
        period: "2024 – 2025",
        highlight:
          "GPA: 3.9",
        courses: [
          "Scalable Databases",
          "Machine Learning",
          "Data Mining",
          "Practical Data Science",
          "Algrithum for Data Science",
        ],
      },
      {
        key: "gtu",
        name: "University of Mumbai",
        url: "https://www.gtu.ac.in/",
        degree: "Master of Business Administration (MBA)",
        school: "St. Francis Institute of Management Studies and Research",
        city: "Mumbai, India",
        period: "2018 – 2020",
        highlight: "CGPA: 8.9/10",
        courses: [
          "Data Structures & Algorithms",
          "Database Management Systems",
          "Operating Systems",
          "Computer Networks",
          "Software Engineering",
        ],
      },
      {
        key: "mu",
        name: "University of Mumbai",
        url: "https://mu.ac.in/",
        degree: "Bachelor of Engineering in Computers",
        school: "Viva Institute of Technology",
        city: "Mumbai, India",
        period: "2011 – 2015",
        highlight: "CGPA: 3/4",
        courses: [
          "Business Analytics",
          "Marketing Strategy",
          "Operations & Supply Chain",
          "Financial Management",
          "Managerial Economics",
          "Data-Driven Decision Making",
        ],
      },
    ];

    const [active, setActive] = React.useState(EDU[0].key);
    const selected = EDU.find((e) => e.key === active) || EDU[0];

    // Local (safe) variants so tabs don't hide content
    const STAGGER_LOCAL = {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { staggerChildren: 0.06 } },
    };
    const ITEM_LOCAL = {
      hidden: { opacity: 0, y: 8 },
      show: { opacity: 1, y: 0 },
    };

    return (
      <div className="mt-8 space-y-8">
        {/* University pills */}
        <motion.div
          className="flex justify-center flex-wrap gap-3"
          variants={STAGGER_LOCAL}
          initial="hidden"
          animate="show"
        >
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

        {/* Degree card — force remount on tab switch */}
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
              <h3 className="text-2xl md:text-3xl font-bold">
                {selected.degree}
              </h3>
              <div className="flex items-center gap-4 text-emerald-400">
                <div className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{selected.period}</span>
                </div>
                <div className="hidden md:inline-flex items-center gap-2 text-emerald-400/80">
                  <GraduationCap className="w-4 h-4" />
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

            {/* Courses (always animate on tab switch, not viewport) */}
            <div>
              <p className="text-sm font-semibold text-zinc-300 mb-3">
                Relevant Coursework
              </p>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={STAGGER_LOCAL}
                initial="hidden"
                animate="show"
              >
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
        className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6
                   hover:border-sky-500/60 hover:shadow-[0_0_60px_-20px_rgba(56,189,248,0.65)]
                   transition-all duration-300 block"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="grid place-items-center w-12 h-12 rounded-xl
                          bg-sky-500/10 border border-sky-400/30 text-sky-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        target="_blank" rel="noreferrer"
        className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6
                   hover:border-sky-500/60 hover:shadow-[0_0_60px_-20px_rgba(56,189,248,0.65)]
                   transition-all duration-300 block"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="grid place-items-center w-12 h-12 rounded-xl
                          bg-sky-500/10 border border-sky-400/30 text-sky-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
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
        target="_blank" rel="noreferrer"
        className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6
                   hover:border-sky-500/60 hover:shadow-[0_0_60px_-20px_rgba(56,189,248,0.65)]
                   transition-all duration-300 block"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="grid place-items-center w-12 h-12 rounded-xl
                          bg-sky-500/10 border border-sky-400/30 text-sky-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"
              viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.9 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.09.81 2.2v3.26c0 .32.22.69.83.57A12 12 0 0 0 12 .5z"/>
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
                <motion.a variants={ITEM} href="mailto:sayalis2024@gmail.com"
                   className="p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition"
                   aria-label="Email">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 6l-10 7L2 6"/><rect x="2" y="6" width="20" height="12" rx="2" ry="2"/>
                  </svg>
                </motion.a>
                <motion.a variants={ITEM} href="https://www.linkedin.com/in/sayalisawant11/" target="_blank" rel="noreferrer"
                   className="p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition"
                   aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </motion.a>
                <motion.a variants={ITEM} href="https://github.com/SayaliSawant0101" target="_blank" rel="noreferrer"
                   className="p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white transition"
                   aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.9 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.09.81 2.2v3.26c0 .32.22.69.83.57A12 12 0 0 0 12 .5z"/>
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
              <a href="#skills" className="hover:text-white">Skills</a>
              <a href="#experience" className="hover:text-white">Professional Experience</a>
              <a href="#education" className="hover:text-white">Academic Background</a>
              <a href="#projects" className="hover:text-white">Projects</a>
              <a href="#blog" className="hover:text-white">Blogs</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
