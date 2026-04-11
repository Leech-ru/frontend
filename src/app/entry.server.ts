import { mergeApplicationConfig } from "@angular/core";
import {
  bootstrapApplication,
  BootstrapContext,
} from "@angular/platform-browser";
import { browserConfig } from "./config/browser";
import { serverConfig } from "./config/server";
import { AppRootComponent } from "./ui/root";

export default (context: BootstrapContext) => {
  return bootstrapApplication(
    AppRootComponent,
    mergeApplicationConfig(browserConfig, serverConfig),
    context,
  );
};
