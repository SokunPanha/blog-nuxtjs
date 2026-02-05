// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/fonts'
  ],
  components: [
    '~/components/blog/ui',
    '~/components/blog/ui/layouts',
    '~/components/blog/ui/common',
    '~/components/blog/features',
    '~/components/admin/ui',
    
  ],
  css: [
    '~/assets/css/main.css',
  ],
  fonts: {
    families:  [
      {
        name: 'Roboto',
        weights: [400, 500, 700],
        provider: 'google',
      },
      {
        name: 'Inter',
        weights: [400, 500, 700],
        provider: 'google',
      }
    ]
  },
  vite: {
    optimizeDeps: {
      include: [
        '@nuxt/ui > prosemirror-state',
        '@nuxt/ui > prosemirror-transform',
        '@nuxt/ui > prosemirror-model',
        '@nuxt/ui > prosemirror-view',
        '@nuxt/ui > prosemirror-gapcursor'
      ]
    }
  },
  i18n:{
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'kh',
        name: 'Khmer',
        file: 'kh.json',
      },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    langDir: 'locales',
  }
})