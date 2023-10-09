import { variables } from "@stellaria/comet";

export const vars = variables({
  button: {
    all: {
      borderRadius: "0.25rem",
    },
    base: {
      background: "#0072f5",
      hoverBackground: "#0062d5",
      border: "#0062d5",
      text: "#ffffff",
      boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.1)",
    },
    success: {
      background: "#00d1b2",
      hoverBackground: "#00c4a7",
      border: "#00c4a7",
      text: "#ffffff",
    },
    error: {
      background: "#e71f33",
      hoverBackground: "#d61d30",
      border: "#a51220",
      text: "#ffffff",
    },
  },
});
