import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client
      .on('error', (err) => {
        console.log(err);
      });
    this.getClient = promisify(this.client.get).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const res = await this.getClient(key);
    return res;
  }

  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del(key) {
    this.client.del(key);
  }
}
const redisClient = new RedisClient();
export default redisClient;
