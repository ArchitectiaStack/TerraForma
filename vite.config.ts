import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // 1. زد هاد السطر

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. زد هاد الـ Plugin
  ],
  base: "/TerraForma/", // 3. استعمل المسار الكامل للريبو ديالك
});