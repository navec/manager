export class AuthService {
  createUser({ email }: { email: string; passport: string }): {
    email: string;
  } {
    return { email };
  }
}
