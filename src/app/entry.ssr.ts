import { APP_BASE_HREF } from "@angular/common";
import { CommonEngine, isMainModule } from "@angular/ssr/node";
import { provideLocation, provideUserAgent } from "@ng-web-apis/universal";
import express from "express";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import bootstrap from "./entry.server";

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, "../browser");
const indexHtml = join(serverDistFolder, "index.server.html");

const app = express();

const commonEngine = new CommonEngine({
  allowedHosts: ["localhost"],
});

app.use(
  express.static(browserDistFolder, {
    maxAge: "1y",
    index: false,
    redirect: false,
  }),
);

app.get("*all", async (request, response, next) => {
  const { protocol, originalUrl, baseUrl, headers } = request;

  try {
    const html = await commonEngine.render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [
        { provide: APP_BASE_HREF, useValue: baseUrl },
        provideLocation(request),
        provideUserAgent(request),
      ],
    });

    response.send(html);
  } catch (err) {
    next(err);
  }
});

if (isMainModule(import.meta.url)) {
  const port = process.env["PORT"] || 4000;
  app.listen(port, () => {
    console.log(`The server is listening at http://localhost:${port}`);
  });
}

export default app;
