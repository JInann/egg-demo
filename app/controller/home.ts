import { Controller } from 'egg';
import cheerio = require('cheerio');
import fs = require('fs')

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const { data } = await this.ctx.curl('http://www.xbiquge.la/53/53881/22735533.html', {
      dataType: 'text',
    });
    const $ = cheerio.load(data);
    const content = $('#content').text();
    ctx.body = content;
  }
  // http://www.xbiquge.la/53/53881/
  public async book() {
    const { ctx } = this;
    const { data } = await this.ctx.curl('http://www.xbiquge.la' + ctx.query.path, {
      dataType: 'text',
    });
    const $ = cheerio.load(data);
    const list = Array.from<any>($('#list a'));
    const body = list.map(v => {
      return `<a href="http://www.xbiquge.la${v.attribs && v.attribs.href}">${v.children[0].data}</a>`;
    }).join('<br>');

    ctx.body = body;
    async function download(index: number) {
      if (index >= list.length) return;
      console.log(list[index].children[0].data);
      const { data } = await ctx.curl(`http://www.xbiquge.la${list[index].attribs.href}`, {
        dataType: 'text',
      });
      const $ = cheerio.load(data);
      const content = '\r\n' + list[index].children[0].data + '\r\n' + $('#content').text();
      fs.appendFileSync('D:/demo/egg-demo/db/book2.txt', content);
      setTimeout(() => {
        download(index + 1);
      }, 300);
    }
    download(0);
  }
  public async ebookList() {
    const data = await this.ctx.service.ebook.getBookList();
    this.ctx.body = data;
  }
  public async addEbook() {
    const data = await this.ctx.service.ebook.addBook(this.ctx.params.id, this.ctx.params.name);
    this.ctx.body = data;
  }
  public async getEbook() {
    const data = await this.ctx.service.ebook.getBook(this.ctx.params.id);
    this.ctx.body = data;
  }
}
