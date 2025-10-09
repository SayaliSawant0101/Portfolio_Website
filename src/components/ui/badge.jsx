import React from "react";

export function Badge({ className = "", ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border border-zinc-700 bg-zinc-800 text-zinc-100 ${className}`}
      {...props}
    />
  );
}
export default Badge;
