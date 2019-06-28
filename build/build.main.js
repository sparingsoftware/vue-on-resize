const rollup = require('rollup')
const babel = require('rollup-plugin-babel')

async function build () {
  const bundle = await rollup.rollup({
    input: 'src/index.js',
    plugins: [
      babel()
    ]
  })

  await bundle.write({
    file: 'dist/vue-on-resize.esm.js',
    format: 'esm'
  })
}

build()
