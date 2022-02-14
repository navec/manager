import { AuthService } from "../services/auth.service";
import { AuthController } from "./auth.controller";

describe(`${AuthController.name}`, () => {
  const service = new AuthService();
  const controller = new AuthController(service);

  it("Should to be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Sign up a new user", () => {
    it("Should return user without passport data", () => {
      // Given
      const user = { email: "fake@email.com", passport: "fake" };
      const input = { req: { user } };
      const { passport, ...expected } = user;
      jest.spyOn(service, "createUser").mockReturnValueOnce(expected);

      // When
      const actual = controller.signup(input);

      // Then
      expect(actual).toEqual(expected);
    });
  });
});
