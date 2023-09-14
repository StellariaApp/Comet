module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-stellaria-comet`
  extends: ["stellaria"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
