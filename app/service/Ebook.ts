import { Service } from 'egg';
/**
 * Ebook Service
 */
export default class Ebook extends Service {

  public addBook(name: string, id: string) {
    const config = this.ctx.service.dB.getConfig();
    config.push({
      name, id,
    });
    this.ctx.service.dB.setConfig(config);
    return true;
  }
  public getBook(id: string) {
    const config = this.ctx.service.dB.getConfig();
    return config.find(c => c.id === id);
  }
  public getBookList() {
    return this.ctx.service.dB.getConfig();
  }
  public hasBook(id: string) {
    return !!this.getBook(id);
  }
}
