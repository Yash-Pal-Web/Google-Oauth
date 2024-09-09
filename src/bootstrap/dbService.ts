import config from "../config/env";
import { DataSource } from "typeorm";
import logger from "../utils/logger";
import { Turnament } from "../components/user/turnamentModel";
import { SERVER_MESSAGE } from "../constant";
import { Player } from "../components/user/playerModel";
import { Room } from "../components/user/roomsModel";

class Database {
  public AppDataSource: DataSource;

  constructor() {
    this.AppDataSource = new DataSource({
      type: "postgres",
      host: config.dbconfig.dbhost,
      port: config.dbconfig.dbport,
      username: config.dbconfig.dbuser,
      password: config.dbconfig.dbpassword,
      database: config.dbconfig.dbname,
      entities: [Player,Room, Turnament],
      synchronize: true,
      logging: false,
    });
  }
  /* database connection */
  async connectDatabase() {
    (await this.AppDataSource.initialize()).synchronize(false).then(() => {
      logger.info(SERVER_MESSAGE.DATABASE_CONNECTION);
      //console.log("database connected successfully")
    });
  }
}

export default new Database();
