"use strict";

module.exports = {
  content: ["./src/**/*.{js,jsx,scss}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      md: "768px",
      lg: "1024px",
      xlarge: "1525px",
      print: { raw: "print" },
    },
    extend: {
      fontSize: {
        14: "14px",
        "ms--2": "11.109px",
        "ms--1": "13.331px",
        "ms-0": "16px",
        "ms-1": "19.2px",
        "ms-2": "23.04px",
        "ms-3": "27.648px",
        "ms-4": "33.178px",
        "ms-5": "39.813px",
      },
      fontFamily: {
        body: [
          "Source Sans Pro",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        heading: [
          "Source Serif Pro",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        code: [
          "Source Code Pro",
          "Consolas",
          "Liberation Mono",
          "Menlo",
          "Courier",
          "monospace",
        ],
      },
      gridTemplateColumns: {
        contributors: "repeat(auto-fit, 36px)",
      },
      colors: {
        malibu: "#8dd6f9",
        "dusty-blue": "#9ab3c0",
        "light-gray": "#36393c",
        denim: "#175d96",
        fiord: "#465e69",
        elephant: "#2b3a42",
        concrete: "#f2f2f2",
        alto: "#dedede",
        "dusty-grey": "#777676",
        "dove-grey": "#666666",
        emperor: "#535353",
        "mine-shaft": "#333333",
      },
    },
    spacing: {
      0: "0px",
      5: "5px",
      10: "10px",
      20: "20px",
    },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "transparent",
      blue: {
        200: "#8dd6f9",
        400: "#1d78c1",
        600: "#465E69",
        800: "#2B3A42",
      },
      gray: {
        100: "#f2f2f2",
        200: "#dedede",
        300: "#999",
        500: "#666",
        600: "#535353",
        700: "#333",
        800: "#222", // non-branding color
        900: "#101619", // non-branding color, used by dark mode
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
