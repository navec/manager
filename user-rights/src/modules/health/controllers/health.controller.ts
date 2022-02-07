import { Controller, GET } from "../../../common/decorators";
import { HealthStatus, IHealth } from "../types/health-status.interface";

@Controller("/health")
export class HealthController {
  @GET()
  get(): IHealth {
    return { status: HealthStatus.UP };
  }
}
