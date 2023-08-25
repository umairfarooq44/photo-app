import Koa from 'koa';
import compress from 'koa-compress';
import router from './routes';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

app
  .use(compress())
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
