import { HealthService } from "../services/health.service";
import { HealthController } from "./health.controller";

describe(`${HealthController.name} controller`, () => {
  const healthService = new HealthService();
  let controller: HealthController;

  beforeAll(() => {
    controller = new HealthController(healthService);
  });

  it("Should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe(`GetHealth function`, () => {
    it("Should", () => {
      // Given
      const expected = null;

      // When
      const actual = controller.getHealth();

      // Then
      expect(actual).toEqual(expected);
    });
  });
});
