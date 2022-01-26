import { createLogger, format, transports } from "winston";

const logConfiguration = {
  transports: [new transports.Console()],
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf((info) => {
      const { timestamp, level, message, ...args } = info;
      const ts = `\x1b[32m${timestamp.slice(0, 19).replace("T", " ")}\x1b[0m`;
      return `${ts} [${level}]: \x1b[33m${message} ${
        Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
      }\x1b[0m`;
    })
  ),
};

export const logger = createLogger(logConfiguration);
