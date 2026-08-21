import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    // Scope discovery to this package's own specs. Anchoring to src/ and to
    // .ts keeps the Release workflow's ./workflows-repo checkout (which ships
    // test/unit/*.test.js vitest specs) from being picked up during validate.
    include: ['src/**/*.test.ts'],
    // color.ts reads these at import time (supports-color) and at call time
    // (the 256-color branch in heroku()); set them before the module graph loads.
    env: {
      FORCE_COLOR: '1',
      TERM: 'screen-256color',
    },
  },
})
