import { Strategy } from "passport-local";

export class LocalStrategy extends Strategy {
  handleRequest(...args: any[]): any {
    const [email, passport] = args;
    return { email, passport };
  }

  constructor(options: { usernameField: string; passwordField: string }) {
    const callback = async (
      username: string,
      passport: string,
      done: Function
    ) => {
      try {
        // Create user
        const user = this.handleRequest(username, passport);
        return done(null, user);
      } catch (error) {
        done(error);
      }
    };
    super(options, callback);
  }
}
