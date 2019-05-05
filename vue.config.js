module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        'vee-validate$': 'vee-validate/dist/vee-validate.minimal.esm.js'
      }
    }
  },
  chainWebpack: config => {
    const { NODE_ENV, LEAVE_DATA_TEST_ATTRS } = process.env

    if (NODE_ENV === 'production' && !LEAVE_DATA_TEST_ATTRS) {
      config.module
        .rule('vue')
        .use('vue-loader')
        .tap(options => {
          options.compilerOptions.modules = [
            {
              preTransformNode (astEl) {
                const { attrsMap, attrsList } = astEl
                if (attrsMap['data-test']) {
                  delete attrsMap['data-test']
                  attrsList.splice(
                    attrsList.findIndex(x => x.name === 'data-test'),
                    1
                  )
                }
                return astEl
              }
            }
          ]
          return options
        })
    }
  }
}
