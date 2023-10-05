import React from "react";
import { DocsThemeConfig, ThemeSwitch } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>My Project</span>,
  toc: {
    backToTop: true,
    float: true,
  },
  project: {
    link: "https://github.com/shuding/nextra-docs-template",
  },
  themeSwitch: {
    component: null,
  },
  navbar: {
    extraContent: <ThemeSwitch />,
  },
  chat: {
    link: "https://discord.com",
  },
  docsRepositoryBase: "https://github.com/shuding/nextra-docs-template",
  footer: {
    component: null,
  },
};

export default config;
