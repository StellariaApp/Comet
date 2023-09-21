import { defineConfig } from "@stellaria/comet";

const config = defineConfig({
  themes: {
    dark: {
      colors: {
        primary: "#ff0000",
      },
    },
    light: {
      colors: {
        primary: "#00ff00",
      },
    },
  },
  vars: {
    colors: {
      primary: {
        light: "#ff0000",
        dark: "#00ff00",
        normal: "#0000ff",
      },
      secondary: {
        light: "#ff0000",
        dark: "#00ff00",
        normal: "#0000ff",
      },
    },
    spacing: {
      small: "0.5rem",
      medium: "1rem",
      large: "2rem",
    },
    fontSize: {
      small: "0.75rem",
      medium: "1rem",
      large: "1.5rem",
    },
  },
});

export default config;
