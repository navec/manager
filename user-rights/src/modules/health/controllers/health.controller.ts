import { Controller, Get } from "../../../common/decorators";
import { HealthStatus, IHealth } from "../types/health-status.interface";

@Controller("/health")
export class HealthController {
  @Get()
  get(): IHealth {
    return { status: HealthStatus.UP };
  }
}
