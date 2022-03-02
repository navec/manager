import { Strategy } from "passport-local";

export class LocalStrategy extends Strategy {
  handleRequest(...args: any[]): any {
    const [email, password] = args;
    return { email, password };
  }

  constructor(options: { usernameField: string; passwordField: string }) {
    const callback = async (
      username: string,
      password: string,
      done: Function
    ) => {
      try {
        // Create user
        const user = await this.handleRequest(username, password);
        return done(null, user);
      } catch (error) {
        done(error);
      }
    };
    super(options, callback);
  }
}
