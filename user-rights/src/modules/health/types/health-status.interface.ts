export enum HealthStatus {
  UP = "UP",
  DOWN = "DOWN",
}

export interface IHealth {
  status: HealthStatus;
}
