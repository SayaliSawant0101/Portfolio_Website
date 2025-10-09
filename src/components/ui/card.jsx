import React from "react";

export function Card({ className = "", ...props }) {
  return <div className={`rounded-2xl border border-zinc-800 bg-zinc-900/60 ${className}`} {...props} />;
}

export function CardHeader({ className = "", ...props }) {
  return <div className={`p-5 border-b border-zinc-800/60 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={`p-5 ${className}`} {...props} />;
}

export default Card;
