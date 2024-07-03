import { Application } from "express";
import express from "express";
import expressLoader from "./express";
import db from './dbService';

export default async (): Promise<Application> => {
  const application = express();
  await db.connectDatabase();

  const applicatios: Application = await expressLoader({ app: application });

  //We can start other process here like rabbitmq , cronJobs and other services

  return applicatios;
};
