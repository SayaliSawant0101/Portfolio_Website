/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',   // if you have a /components folder
    './src/components/**/*.{js,ts,jsx,tsx}' // shadcn/ui etc.
  ],
  safelist: [
    // Colors you use for the chips / tabs / glows
    {
      pattern: /(bg|text|border|ring)-(emerald|sky|zinc|slate|cyan)-(100|200|300|400|500|600|700)/,
    },
    // Opacity variants you used like bg-emerald-400/10, border-sky-500/60
    {
      pattern: /(bg|border|text)-(emerald|sky|zinc|slate|cyan)-(100|200|300|400|500|600|700)\/(10|20|30|40|50|60|70|80|90)/,
    },
    // Rounded/shadow utilities if any are built from variables
    /(rounded|shadow)-[a-z0-9-]+/,
    // Keep arbitrary glow shadow you used on hover (the long rgba[] one)
    /hover:shadow-\[0_0_60px_-20px_rgba\(56,189,248,0\.65\)\]/,
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

