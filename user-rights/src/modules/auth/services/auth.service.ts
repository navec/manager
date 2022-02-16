import jwt from "jsonwebtoken";

export class AuthService {
  createUser({ email }: { email: string; password: string }): {
    email: string;
  } {
    return { email };
  }

  generateToken(user: { email: string; password: string }): { token: string } {
    // Find user from db
    const { password, ...payload } = user;
    return { token: jwt.sign(payload, "secret") };
  }
}
