import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  routes: (routes) => {
    return [
      ...routes,
      {
        path: "/",
        redirect: "/calendar/month",
      },

      {
        path: "/calendar",
        redirect: "/calendar/month",
      },
    ];
  },
};
