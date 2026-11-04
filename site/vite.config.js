import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // o design system mora um nível acima (../design-system)
  server: { fs: { allow: [".."] } },
});
