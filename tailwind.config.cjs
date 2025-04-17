/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      keyframes: {
        resetScale: {
          from: { transform: "scale(0)" },
          to: { transform: "scale(1)" },
        },
        rotate: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        resetScale:
          "1000ms resetScale calc(250ms + (var(--reval-delay) * 100ms)) forwards",
        rotate: "1000ms rotate forwards infinite linear",
      },
    },
  },
  plugins: [require("tailwindcss-all")],
};
