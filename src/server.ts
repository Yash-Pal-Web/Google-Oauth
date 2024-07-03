

import { Application } from "express";
import applicationInitialization from "./bootstrap";
import http from "http";
import config from "./config/env";
import "reflect-metadata";
import logger from './utils/logger';

class ServerInstance {
  constructor() {
    this.init();
  }

  async init() {
    try {
      const app: Application = await applicationInitialization();
      const server: http.Server = http.createServer(app);
    
      server.listen(config.PORT, () => {
        // console.log(`server started on ${config.PORT}`);
        // console.log(`server Url http://localhost:${config.PORT}`);
        logger.info(`server started on ${config.PORT}`);
        logger.info(`server Url http://localhost:${config.PORT}`);
      });
      return server;
    } catch (error: any) {
      console.log("Error occured when starting server:::", error);
    }
  }
}

export default new ServerInstance();
