import { Request, Response } from "express";
import { Controller, GET } from "../../../common/decorators";
import { HealthService } from "../services/health.service";

@Controller("/health")
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @GET()
  getHealth(req: Request, res: Response): unknown {
    return res.send({ name: "toto" });
  }
}
