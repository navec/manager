import { Router } from "express";
import { Controller, Injectable } from "../../../common/decorators";
import { IRoute } from "../../../types";

@Injectable()
export class HealthService {
  constructor() {}

  display() {
    console.log("Service");
  }
}

@Controller()
export class HealthController {
  private readonly path = "/health";
  private readonly _routes: IRoute[] = [];

  constructor(private readonly service: HealthService) {
    this.initialize();
    this.service.display();
  }

  private initialize() {
    const root = { path: this.path, type: "GET", callback: this.getHealth() };
    this._routes.push(root);
  }

  getHealth(): Router {
    return Router().get("/health", (request, response) => {
      response.send("Simple API Gateway");
    });
  }

  get routes(): IRoute[] {
    return this._routes;
  }
}
