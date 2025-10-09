import React from "react";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default: "bg-blue-600 text-white hover:bg-blue-500",
  secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700",
  outline: "border border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-100",
  link: "bg-transparent underline-offset-4 hover:underline text-zinc-100 p-0 h-auto",
};

const sizes = {
  sm: "h-9 px-3 py-2",
  md: "h-10 px-4 py-2",
  lg: "h-11 px-5 py-2.5",
};

export function Button({ className = "", variant = "default", size = "md", asChild, ...props }) {
  const cls = `${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`;
  if (asChild) return <a className={cls} {...props} />;
  return <button className={cls} {...props} />;
}
export default Button;
