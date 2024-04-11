import type { DOMWrapper } from "@vue/test-utils";

import { config, createWrapperError } from "@vue/test-utils";

declare module "@vue/test-utils" {
  export class VueWrapper {
    findByText(text: string, selector?: string): DOMWrapper<Node>;
  }
}

config.plugins.VueWrapper.install((wrapper) => {
  function findByText(text: string, selector = "*") {
    const elements = wrapper.findAll(selector);

    for (const element of elements) {
      if (element.text().trim() === text.trim()) {
        return element;
      }
    }

    return createWrapperError("DOMWrapper");
  }

  return { findByText };
});
