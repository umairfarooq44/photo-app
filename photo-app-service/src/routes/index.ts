import { BaseContext } from 'koa';
import Router from 'koa-router';
import koaBunyanLogger from 'koa-bunyan-logger';
import bodyParser from 'koa-bodyparser';
import { log, parseHeader } from '../utils/logging';
import errorHandler from '../utils/errorHandling';
import comment from './comment';
import images from './images';

const router = new Router();

router
  .get('/health', (ctx: BaseContext) => {
    ctx.body = 'Very healthy photo-app-service';
  })
  .use(koaBunyanLogger(log))
  .use(bodyParser())
  .use(koaBunyanLogger.requestIdContext())
  .use(
    /* istanbul ignore next */
    koaBunyanLogger.requestLogger({
      /* istanbul ignore next */
      updateResponseLogFields: (fields: any) => ({
        ...fields,
        resHeader: parseHeader(fields?.res?._header)
      })
    })
  )
  .use(errorHandler())
  .use('/images', images)
  .use('/comment', comment);

if (process.env.APP_ENV !== 'production') {
  router.get('/error-trigger', () => {
    throw new Error('Triggered');
  });
}
export default router;
