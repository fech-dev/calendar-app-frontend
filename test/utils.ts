import { mount as _mount } from "@vue/test-utils";
import { get } from "lodash-es";
import { http, type HttpResponseResolver } from "msw";
import { setupServer } from "msw/node";

/**
 * Customize mount function for global setup
 */
const mount: typeof _mount = (component, options = {}) => {
  return _mount(component, {
    ...options,
  });
};

// Helper to setup request interceptors

type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";

interface SetupInterceptOptions {
  baseURL?: string;
  handlers?: Record<string, HttpResponseResolver>;
}

/**
 * Setup the msw package to use with vitest
 *
 * @example
 *
 * const {intercept} = setupIntercept({
 *   baseURL: 'http://localhost:3000/api',
 *   handlers: {
 *     'GET /users': () => HttpResponse.json({...}),
 *     'GET /profile/:id': () => HttpResponse.json({...})
 *   }
 * })
 *
 * // Add handlers from a test
 * test('should...', () => {
 *  intercept('GET', '/users', () => HttpResponse.json([...]))
 * })
 *
 *
 */
export const setupIntercept = (options: SetupInterceptOptions) => {
  const { baseURL = "", handlers = {} } = options;

  const parseHandlers = () =>
    Object.entries(handlers || {}).map(([requestURL, resolver]) => {
      const [path, method = "GET"] = requestURL.split(" ").reverse();

      return get(http, method.toLowerCase())(baseURL + path, resolver);
    });

  const server = setupServer(...parseHandlers());

  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const intercept = (
    method: HttpMethods,
    uri: string,
    resolver: HttpResponseResolver
  ) => {
    server.use(get(http, method.toLowerCase())(baseURL + uri, resolver));
  };

  return { server, intercept };
};

// export all from test-utils
export * from "@vue/test-utils";

// use custom test-utils' mount function
export { mount };
