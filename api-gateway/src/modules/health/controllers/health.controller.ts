import { Controller, GET } from "../../../common/decorators";
import { Guard } from "../../../common/decorators/guard.decorator";
import { HealthService } from "../services/health.service";
import { Api, HealthStatus } from "../types/health-status.interface";

@Guard()
@Controller("/health")
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @GET()
  getHealth(): HealthStatus {
    return { [Api.API_GATEWAIT]: "running" };
  }
}
