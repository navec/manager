import { Controller, GET } from "../../../common/decorators";
import { HealthService } from "../services/health.service";

@Controller("/health")
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @GET()
  getHealth(toto: any): { content: string } {
    console.log({ toto });
    return { content: "je l'aime" };
  }
}
