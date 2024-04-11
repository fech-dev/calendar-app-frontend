import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    environmentOptions: {
      nuxt: {
        domEnvironment: "jsdom",
        overrides: {
          // other Nuxt config you want to pass
        },
      },
    },
  },
});
