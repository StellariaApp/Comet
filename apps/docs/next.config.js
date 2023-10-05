const withComet = require('@stellaria/comet-next')

const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
})

module.exports = withNextra(withComet({}))
