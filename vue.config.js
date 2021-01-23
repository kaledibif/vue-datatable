module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Flight Information DataTable'
      return args
    })
  }
}
