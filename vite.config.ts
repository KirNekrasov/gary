import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/gary/",
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "gary.avif",
        "gary.webp",
        "gary.jpg",
        "sound.mp3",
        "icon-192.png",
      ],
      manifest: {
        name: "Gary's Button",
        short_name: "GaryApp",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
