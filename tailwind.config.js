import { heroui } from '@heroui/theme';
/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@heroui/theme/dist/components/(button|card|chip|dropdown|modal|popover|skeleton|ripple|spinner|menu|divider).js"
];
export const darkMode = 'class';
export const theme = {
  extend: {},
};
export const plugins = [heroui({
  addCommonColors: true,
  themes: {
    light: {
      colors: {},
    },
    dark: {
      colors: {
        background: "#090909",
        foreground: "#f9f9f9",
        primary: {
          DEFAULT: "#f9f9f9",
          foreground: "#161616",
        },
        secondary: {
          DEFAULT: "#252525",
          foreground: "#f9f9f9",
        },
      },
    },
  },
}),];