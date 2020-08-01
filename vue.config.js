module.exports = {
  pages: {
    index: 'src/main.js',
    demo: 'src/pages/demo/main.js'
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
