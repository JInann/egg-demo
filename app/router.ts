import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/book', controller.home.book);
  router.get('/ebook/list', controller.home.ebookList);
  router.get('/ebook/:id', controller.home.getEbook);
  router.get('/ebook/add/:id/:name', controller.home.addEbook);
};
