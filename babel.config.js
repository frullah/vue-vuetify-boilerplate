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
