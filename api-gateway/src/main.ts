import express from "express";
import "reflect-metadata";
import { AppModule } from "./app.module";
import { logger } from "./config/logger.config";

function bootstrap() {
  const server = express();
  AppModule.create(server);

  const PORT = 3000;
  server.listen(PORT, () => {
    logger.info(`Api gatewait listening at http://localhost:${PORT}`);
  });
}

bootstrap();
