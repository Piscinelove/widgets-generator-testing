const { resolve } = require('upath')
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    ['~/modules/nuxt-aio-widget', {
        analyzer: false,
        polyfill: true,
        publicPath: '/',
        staticPath: resolve(__dirname, './static/publish/widgets'),
        publishPath: 'static/publish',
        publishSite: 'https://3000-ba965536-8b25-40b5-a199-e105e7f1ce7e.ws-eu01.gitpod.io',
        entries: [
          {
            name: 'packages',
            tags: [
              {
                async: false,
                name: 'NetplusTestPackages',
                path: '~/components/widgets/Test.vue',
                options: {
                  props: {
                    test:'test',
                    pktuveuxpas:'pktuveuxpas'
                  },
                },
              },
          ]
          }
        ]
      }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
