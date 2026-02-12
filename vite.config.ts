import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/gary/",
  plugins: [
    cssInjectedByJsPlugin(),
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
      workbox: {
        inlineWorkboxRuntime: true,
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|avif|webp|mp3)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "assets",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
            },
          },
        ],
      },
    }),
  ],
});
