import { Controller, Get, UseGuards } from "../../../common/decorators";
import { AuthJwtGuard } from "../../common/guards/auth-jwt.guard";
import { HealthStatus, IHealth } from "../interfaces/health-status.interface";

@Controller("/health")
export class HealthController {
  @UseGuards(AuthJwtGuard)
  @Get()
  get(): IHealth {
    return { status: HealthStatus.UP };
  }
}
