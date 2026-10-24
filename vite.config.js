import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      include: [
        'src/components/**',
        'src/context/**',
        'src/data/**',
        'src/hooks/**',
        'src/pages/**',
        'src/utils/**',
      ],
    },
  },
})