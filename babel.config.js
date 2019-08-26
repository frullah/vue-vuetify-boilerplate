module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@vue/app',
      {
        loose: true,
        exclude: [
          'transform-regenerator',
          'transform-async-to-generator'
        ]
      }
    ]
  ],
  plugins: [
    'transform-async-to-promises'
  ]
}
if (process.env.BABEL_ENV === 'test') {
  module.exports.plugins.push('require-context-hook')
}
