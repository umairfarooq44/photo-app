import DotEnv from 'dotenv';
import { createServer } from 'http';
DotEnv.config();

import app from './app';
import configs from './config';
import db from './db';
import { log } from './utils/logging';

async function startServer() {
  const PORT = configs.port;
  if (process.env.NODE_ENV !== 'test') {
    if (!configs.db.databaseURL) {
      throw new Error(
        `missing required MONGODB_CONNECTION_STRING env variable`
      );
    }
    await db.connect(configs.db.databaseURL, log, configs.db.debug);
  }
  const httpServer = createServer(app.callback());

  httpServer.listen(PORT, () => {
    log.info(
      `Server listening on port ${PORT}, you can check its health accessing /health `
    );
  });
}

startServer();
