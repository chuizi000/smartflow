module.exports = {
    chainWebpack: config => {
      config.module
        .rule('raw')
        .test(/\.sol$/)
        .use('raw-loader')
        .loader('raw-loader')
        .end()
    }
  }