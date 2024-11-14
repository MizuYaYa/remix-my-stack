import fs from "node:fs";
import { createSecureServer } from "node:http2";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { type ServerBuild, installGlobals } from "@remix-run/node";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { etag } from "hono/etag";
import { logger as honoLogger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import log4js from "log4js";
import { remix } from "remix-hono/handler";
import { httpsOnly } from "remix-hono/security";

// @ts-expect-error
//biome-ignore lint/style/noNamespaceImport: これで動く...
import * as build from "./build/server/index.js";
const serverBuild = build as unknown as ServerBuild;

const USE_HTTPS = false;
const PORT = 8080;

const app = new Hono();

log4js.configure({
  appenders: {
    out: { type: "stdout" },
    server: { type: "file", filename: "server.log" },
  },
  categories: {
    default: { appenders: ["server", "out"], level: "all" },
  },
});
const logger = log4js.getLogger();
logger.level = "debug";

installGlobals({ nativeFetch: true });
app.use(honoLogger());
app.use(compress());
if (USE_HTTPS) {
  app.use(httpsOnly());
}
app.use(secureHeaders());

app.use("/assets/*", etag());
app.use(
  "/assets/*",
  serveStatic({
    root: "build/client/",
  }),
);

app.use(serveStatic({ root: "build/client/" }));

// needs to handle all verbs (GET, POST, etc.)
app.all(
  "*",
  remix({
    // `remix build` and `remix dev` output files to a build directory, you need
    // to pass that build to the request handler
    build: serverBuild,

    // return anything you want here to be available as `context` in your
    // loaders and actions. This is where you can bridge the gap between Remix
    // and your server
    getLoadContext(c) {
      return c.env;
    },
  }),
);

if (USE_HTTPS) {
  serve({
    fetch: app.fetch,
    port: PORT,
    createServer: createSecureServer,
    serverOptions: {
      key: fs.readFileSync("./server-privatekey.pem"),
      cert: fs.readFileSync("./server-crt.pem"),
    },
  });
} else {
  serve({
    fetch: app.fetch,
    port: PORT,
  });
}

logger.info(`Server is running ${USE_HTTPS ? "HTTPS" : "HTTP"} on port ${PORT}`);
