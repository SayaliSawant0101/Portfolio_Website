// SkillsSlideInPanel.jsx — single file, slide-in card from left with initials grid
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsSlideInPanel() {
  const [open, setOpen] = React.useState(false);

  // your skills
  const SKILLS = [
    "Python","scikit-learn","XGBoost","LightGBM","CATBoost","SHAP",
    "Linear Regression","Logistic Regression","KNN","KMeans","DBSCAN","Prophet",
    "Decision Tree","Random Forest","FastAPI","OpenAPI","Pytorch","TensorFlow",
    "Keras","Hugging Face","Transformers","CNN","RNN","BERT","RoBERTa","LSTM","GRU","LoRa",
    "SQL","NoSQL","Tableau","Power BI","Plotly","Matplotlib","Excel",
    "PostgreSQL","BigQuery","Snowflake","S3","MySQL","MongoDB","Hive",
    "AWS","EC2","Lambda","API Gateway","CloudWatch","Glue","Athena","Redshift",
    "Git","GitHub","JIRA"
  ];

  const getInitials = (name) => {
    const caps = name.match(/[A-Z]/g);
    if (caps && caps.length >= 2) return (caps[0] + caps[1]).toUpperCase();
    const parts = name.split(/[\s-]+/);
    if (parts.length === 1) return name.slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // close on ESC and when clicking backdrop
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const panelVariants = {
    hidden: { x: "-100%", opacity: 0 },
    show:   { x: 0, opacity: 1, transition: { type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit:   { x: "-100%", opacity: 0, transition: { type: "tween", duration: 0.35 } },
  };

  return (
    <div className="relative">
      {/* Left trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-400/40 bg-zinc-900/70 text-emerald-300 hover:border-emerald-400/80 hover:shadow-[0_0_28px_-10px_rgba(52,211,153,0.6)] transition"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
        Show Skills
      </button>

      {/* Overlay + Slide-in Card */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop (click to close) */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              onClick={() => setOpen(false)}
            />
            {/* Panel */}
            <motion.aside
              className="fixed left-0 top-0 bottom-0 z-50 w-[92vw] sm:w-[520px] md:w-[640px] lg:w-[720px] 
                         bg-zinc-950/90 border-r border-emerald-400/20 backdrop-blur-xl"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-emerald-400/20 bg-zinc-950/80">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                  <h3 className="text-sm font-semibold text-emerald-300">Skills</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="px-2 py-1 text-xs rounded-md border border-zinc-800/70 bg-zinc-900/60 text-zinc-300 hover:border-emerald-400/60"
                >
                  Close
                </button>
              </div>

              {/* Content: initials cards grid */}
              <div className="p-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {SKILLS.map((skill, i) => (
                    <button
                      key={`${skill}-${i}`}
                      title={skill}
                      onClick={() => navigator.clipboard.writeText(skill)}
                      className="group relative rounded-xl w-16 h-16 grid place-items-center
                                 bg-zinc-900/60 border-2 border-emerald-400/40
                                 shadow-[0_0_18px_-12px_rgba(52,211,153,0.35)]
                                 hover:border-emerald-400/80 hover:shadow-[0_0_42px_-10px_rgba(52,211,153,0.7)]
                                 transition"
                    >
                      <span className="font-semibold tracking-wide text-[#34d399] text-lg drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]">
                        {getInitials(skill)}
                      </span>
                      <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-zinc-400 opacity-0 group-hover:opacity-100 transition">
                        {skill}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Foot row: helper text */}
                <p className="mt-4 text-[11px] text-zinc-400">
                  Tip: Hover to see full name. Click a card to copy the skill.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
