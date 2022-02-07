import bunyan from "bunyan";
import config from "./config";
import bunyanDebugStream, { serializers } from "bunyan-debug-stream";

/**
 * base logger nothing fancy, just to separate out logs from various parts
 * of this app
 */
export default bunyan.createLogger({
  name: config.server.name,
  stream: bunyanDebugStream({
    basepath: __dirname,
    forceColor: true,
  }),
  serializers: {
    ...bunyan.stdSerializers,
    ...serializers,
  },
});
