import getRoutes from './utils/getRoutes'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Leigh Dinaya | Front-End Developer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Front-End Developer | Web3 Enthusiast | OSS Advocate | Lifelong Learner',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/tailwind.css', 'animate.css/animate.min.css'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxt/postcss8',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics',
  ],
  webfontloader: {
    google: {
      families: ['Inter:300,700&display=swap'],
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-speedkit',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: "Leigh's Website",
      short_name: "Leigh's Website",
      lang: 'en',
      description: 'Leigh Dinaya Website',
      background_color: '#fafafa',
      theme_color: '#fafafa',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/favicon.ico',
          sizes: '512x512',
          type: 'image/x-icon',
        },
      ],
    },
  },

  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },

  eslint: { cache: false },

  sitemap: {
    hostname: process.env.BASE_URL || 'https://testwebsite3leigh.netlify.app',
    routes() {
      return getRoutes()
    },
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },

  image: {
    // Options
  },

  googleAnalytics: {
    id: 'UA-156810526-1',
  },

  speedkit: {
    detection: {
      performance: true,
      browserSupport: true,
    },
    performanceMetrics: {
      device: {
        hardwareConcurrency: { min: 2, max: 48 },
        deviceMemory: { min: 2 },
      },
      timing: {
        fcp: 800,
        dcl: 1200,
      },
      lighthouseDetectionByUserAgent: false,
    },
    fonts: [
      {
        family: 'Inter',
        locals: ['Inter'],
        fallback: ['Arial', 'sans-serif'],
        variances: [
          {
            style: 'light',
            weight: 300,
            sources: [{ src: '@/assets/fonts/Inter-Light.ttf', type: 'ttf' }],
          },
          {
            style: 'bold',
            weight: 700,
            sources: [{ src: '@/assets/fonts/Inter-Bold.ttf', type: 'ttf' }],
          },
        ],
      },
    ],

    componentAutoImport: false,
    componentPrefix: undefined,

    /**
     * IntersectionObserver rootMargin for Components and Assets
     */
    lazyOffset: {
      component: '0%',
      asset: '0%',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
