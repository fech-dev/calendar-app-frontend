import { afterEach } from "vitest";
import type { RenderOptions } from "@testing-library/vue";
import { cleanup, render as _render } from "@testing-library/vue";

afterEach(() => cleanup());

function render(component: any, options: RenderOptions) {
  return _render(component, {
    ...options,
  });
}

export * from "@testing-library/vue";
export { default as userEvent } from "@testing-library/user-event";

export { render };
