import React from "react";
import { motion as m } from "framer-motion";

// Shared parent/child stagger animation
const container = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
};

// Wrapper that staggers all children
export const Stagger = ({ children, className = "", once = true }) => (
  <m.div
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once, amount: 0.2 }}
    className={className}
  >
    {React.Children.map(children, (child) => (
      <m.div variants={item}>{child}</m.div>
    ))}
  </m.div>
);

// Single reveal element
export const Reveal = ({ children, delay = 0, className = "" }) => (
  <m.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true, amount: 0.25 }}
    className={className}
  >
    {children}
  </m.div>
);
