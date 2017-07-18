const rollupTypescript = require('rollup-plugin-typescript')

export default {
  entry: './src/stage.ts',
  format: 'cjs',
  dest: './dist/app.js',
  plugins: [
    rollupTypescript()
  ],
  banner: '/* DEMO-LINJILEI */'
}