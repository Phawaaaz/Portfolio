/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme colours come from CSS variables in index.css (dark by default,
        // light under [data-theme="light"]), so `/opacity` modifiers still work.
        page: 'rgb(var(--page) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          light: 'rgb(var(--accent-light) / <alpha-value>)',
        },
        raised: 'rgb(var(--raised) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
