// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  modules: ["@nuxt/test-utils/module", "@nuxt/ui"],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: "",
    },
  },

  colorMode: {
    preference: "light",
  },
});
