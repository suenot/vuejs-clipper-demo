module.exports = {
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'http://88.99.32.159:5000/',
  //       ws: true,
  //       changeOrigin: true,
  //       secure: false,
  //       cookieDomainRewrite: '',
  //       onProxyReq: function (request, req, res) {
  //         request.setHeader('origin', 'http://88.99.32.159:5000/')
  //       }
  //     },
  //   }
  // },
  chainWebpack: (config) => {

    // default settings for visualfanatic/vue-svg-loader
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

    // default settings for oliverfindl/vue-svg-inline-loader
    config.module
      .rule("vue")
      .use("vue-svg-inline-loader")
        .loader("vue-svg-inline-loader");

    const oneOfsMap = config.module.rule('sass').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: './src/assets/vars.sass',
        })
        .end()
    })
  }
}
