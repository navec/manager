import { Injectable } from "../../../common/decorators";

@Injectable()
export class HealthService {
  constructor() {}

  display() {
    console.log("Service");
  }
}
