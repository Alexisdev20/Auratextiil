import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Simula un navegador
    globals: true,        // Habilita la API global como `describe`, `it`, etc.
  },
});
