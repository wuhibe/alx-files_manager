import { promisify } from 'util';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export default class AppController {
  static async getStats() {
    this.getUser = promisify(dbClient.nbUsers);
    this.getFile = promisify(dbClient.nbFiles);
    const users = await this.getUser();
    const files = await this.getFile();
    return ({ users, files });
  }

  static getStatus() {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();
    return ({ redis, db });
  }
}
