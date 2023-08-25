import KoaRouter from 'koa-router';

const router = new KoaRouter();

import { addComment, getComments } from './comment';

router.post('/', addComment);
router.get('/list', getComments);

export default router.routes();
