export default {
  files: [
    'src/**/*.spec.ts',
  ],
  // match: [
  //   '*.spec.ts'
  // ],
  extensions: [
    'ts',
  ],
  compileEnhancements: false,
  require: [
    'ts-node/register/transpile-only'
  ]
}
