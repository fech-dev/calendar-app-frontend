import { mount as _mount } from "@vue/test-utils";

const mount: typeof _mount = (component, options = {}) => {
  return _mount(component, {
    ...options,
  });
};

export * from "@vue/test-utils";

export { mount };
