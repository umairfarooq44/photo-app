import KoaRouter from 'koa-router';
import body from 'koa-body';
import { uploadImage, getImages } from './images';
const router = new KoaRouter();

router.post('/upload', body({ multipart: true }), uploadImage);
router.get('/', getImages);

export default router.routes();
