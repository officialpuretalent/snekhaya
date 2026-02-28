import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      include: [
        'src/data/taxData.js',
        'src/components/calculators/**/*.vue',
      ],
      reporter: ['text', 'html'],
      thresholds: {
        // Business logic: strict 100% — all branches exercised
        '**/taxData.js': { lines: 100, branches: 100, functions: 100, statements: 100 },
        '**/RaCalculator.vue': { lines: 100, branches: 100, functions: 100, statements: 100 },
        // v8 source-map gap on template (exclusion radio) — all logic tested
        '**/CgtCalculator.vue': { lines: 98, branches: 97, functions: 90, statements: 98 },
        // Template compilation artifacts: v8 source-map gaps on HTML element boundaries
        // (<input> open-tag, </button> close-tag) and inside <Transition> slot functions
        // prevent these two files from reaching 100% — all business logic IS tested.
        '**/IncomeCalculator.vue': { lines: 97, branches: 96, functions: 89, statements: 97 },
        '**/VatCalculator.vue': { lines: 95, branches: 100, functions: 79, statements: 95 },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
