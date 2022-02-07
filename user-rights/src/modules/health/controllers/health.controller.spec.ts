import { HealthStatus } from "../types/health-status.interface";
import { HealthController } from "./health.controller";

describe(`${HealthController.name}`, () => {
  const controller = new HealthController();

  it("Should to be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Get API health", () => {
    it("Should return UP status when the api is running successfully", () => {
      // Given
      const expected = { status: HealthStatus.UP };

      // When
      const actual = controller.get();

      // Then
      expect(actual).toEqual(expected);
    });
  });
});
