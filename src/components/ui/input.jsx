import React from "react";

export const Input = React.forwardRef(function Input({ className = "", ...props }, ref) {
  return (
    <input
      ref={ref}
      className={`flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500 ${className}`}
      {...props}
    />
  );
});
export default Input;