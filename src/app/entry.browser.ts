import { bootstrapApplication } from "@angular/platform-browser";
import { browserConfig } from "./config/browser";
import { AppRootComponent } from "./ui/root";

try {
  await bootstrapApplication(AppRootComponent, browserConfig);
} catch (error) {
  console.error(error);
}
