import { Application } from "./application";
import { AuthModule } from "./modules/auth/auth.module";
import { HealthModule } from "./modules/health/health.module";
import { IModule } from "./types";

const modules: IModule[] = [new HealthModule(), new AuthModule()];

Application.createServer().addModules(modules).start(3010);
