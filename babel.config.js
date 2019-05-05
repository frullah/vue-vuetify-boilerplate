module.exports = {
  presets: [
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
    [
      'module:fast-async',
      {
        codeGenerationOptions: {
          wrapAwait: false
        }
      }
    ]
  ]
}
