import { Application } from "./application";
import { HealthModule } from "./modules/health/health.module";

Application.createServer().addModules(new HealthModule()).start(3000);
