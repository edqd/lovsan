import rc from "rc";

const appName = "lovsan";

/**
 * just a simple config manager
 *
 */
export const defaults = {
  server: {
    port: 3000,
    name: appName,
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
      optionsSuccessStatus: 200,
    },
  },
};

export const config = rc(appName, defaults) as typeof defaults;

export default config;
