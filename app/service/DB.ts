import { Service } from 'egg';
import fs = require('fs');
interface Config{
  id: string;
  name: string;
}
/**
 * Ebook Service
 */
export default class DB extends Service {

  public getConfig(): Array<Config> {
    return JSON.parse(fs.readFileSync('D:/demo/egg-demo/db/config.json').toString()) as Array<Config>;
  }
  public setConfig(config) {
    return fs.writeFileSync('D:/demo/egg-demo/db/config.json', JSON.stringify(config));
  }
}
