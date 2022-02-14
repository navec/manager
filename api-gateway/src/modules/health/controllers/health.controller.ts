import { Controller, GET } from "../../../common/decorators";
import { HealthService } from "../services/health.service";
import { Api, HealthStatus } from "../types/health-status.interface";

@Controller("/health")
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @GET()
  getHealth(): HealthStatus {
    return { [Api.API_GATEWAIT]: "running" };
  }
}
