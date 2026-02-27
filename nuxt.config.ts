// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: {
    port: 3001,
  },
  runtimeConfig: {
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  routeRules: {
    "/": { swr: 60 },
    "/blog": { swr: 10 },
    "/blog/**": { swr: 10 },
    "/category": { swr: 10 },
    "/category/**": { swr: 10 },
    "/profile": { ssr: true },
    "/kh": { swr: 60 },
    "/kh/**": { swr: 10 },
    "/admin/**": { ssr: true },
  },
  imports: {
    dirs: ["composables/admin", "composables/blog", "composables/shared"],
  },
  modules: [
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxt/fonts",
    "@nuxtjs/mdc",
    "nuxt-auth-utils",
    [
      "@vite-pwa/nuxt",
      {
        registerType: "autoUpdate",
        manifest: {
          name: "Dev Hub",
          short_name: "Dev Hub",
          description: "A tech blog by Panha",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          start_url: "/",
          scope: "/",
          icons: [
            {
              src: "/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,png,svg,ico,woff2}"],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
              },
            },
          ],
        },
        client: {
          installPrompt: true,
        },
        devOptions: {
          enabled: true,
          suppressWarnings: true,
          type: "module",
        },
      },
    ],
  ],
  components: [
    "~/components/blog/ui",
    "~/components/blog/ui/layouts",
    "~/components/blog/ui/common",
    "~/components/blog/features",
    "~/components/admin/ui",
    "~/components/admin/ui/common",
    "~/components/admin/ui/posts",
    "~/components/admin/ui/categories",
    "~/components/admin/ui/tags",
    "~/components/admin/ui/users",
    "~/components/shared",
  ],
  css: ["~/assets/css/main.css"],
  fonts: {
    families: [
      {
        name: "Roboto",
        weights: [400, 500, 700],
        provider: "google",
      },
      {
        name: "Inter",
        weights: [400, 500, 700],
        provider: "google",
      },
    ],
  },
  vite: {
    optimizeDeps: {
      include: [
        "@nuxt/ui > prosemirror-state",
        "@nuxt/ui > prosemirror-transform",
        "@nuxt/ui > prosemirror-model",
        "@nuxt/ui > prosemirror-view",
        "@nuxt/ui > prosemirror-gapcursor",
      ],
    },
  },
  nitro: {
    prerender: {
      failOnError: false,
    },
  },

  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
        files: [
          "en.json",
          "en/label.json",
          "en/message.json",
          "en/tableColumn.json",
          "en/validation.json",
          "en/placeholder.json",
        ],
      },
      {
        code: "kh",
        name: "Khmer",
        files: [
          "kh.json",
          "kh/label.json",
          "kh/message.json",
          "kh/tableColumn.json",
          "kh/validation.json",
          "kh/placeholder.json",
        ],
      },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    langDir: "locales",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_locale",
      redirectOn: "root",
    },
  },
  app: {
    head: {
      link: [
        // Fonts (already there)
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap",
        },
        // Favicon
        {
          rel: "icon",
          type: "image/png", // or "image/svg+xml" if using SVG
          href: "https://cdn-icons-png.freepik.com/512/11187/11187715.png", // place your favicon in /public folder
        },
        // optional: shortcut icon
        {
          rel: "shortcut icon",
          type: "image/png",
          href: "https://cdn-icons-png.freepik.com/512/11187/11187715.png",
        },
      ],
    },
  },
});
