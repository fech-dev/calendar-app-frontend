// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  modules: ["@nuxt/test-utils/module", "@pinia/nuxt", "@nuxt/ui"],

  colorMode: {
    preference: "light",
  },
});
