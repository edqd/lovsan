if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}
import next from "next";
import express from "express";
import baselog from "./infra/baselog";
import config from "./infra/config";
import cors from "cors";
// import helmet from "helmet";

import { restApiAdapter } from "./adapters/rest";

const log = baselog.child({ main: "server" });

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // this would probably be a good idea in prod
  // server.use(helmet());
  server.use(cors(config.server.cors));

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use("/api", restApiAdapter);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = config.server.port;

  server.listen(port, () => {
    log.info({ port }, `Ready on http://localhost:${port}`);
  });
});
