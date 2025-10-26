import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Assign/segment/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://webhook.site/2be76ee8-ea2b-42e2-a3b2-f7cae73d82df",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
