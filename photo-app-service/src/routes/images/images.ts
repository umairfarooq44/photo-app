import { Context, Request } from 'koa';
import { Files } from 'formidable';
import { getImagesQueryPayload, uploadImagePayload } from './validation';
import {
  uploadFileOnGCP,
  createImage,
  getImageList
} from '../../controllers/images';

export interface FileRequest extends Request {
  body?: any;
  files?: Files;
}

export interface FileContext extends Context {
  request: FileRequest;
}

export const uploadImage = async (ctx: FileContext) => {
  const { image } = await uploadImagePayload.validate(
    { ...ctx.request.files },
    { stripUnknown: true }
  );
  const url = await uploadFileOnGCP(image);

  const savedImage = await createImage({ imageUrl: url });

  ctx.body = { ...savedImage };
  ctx.status = 200;
};

export const getImages = async (ctx: Context) => {
  const { offset, limit } = await getImagesQueryPayload.validate(
    { ...ctx.query },
    { stripUnknown: true }
  );

  const images = await getImageList({}, offset, limit);
  const { data, totalCount } = images[0];
  const items = { data, total: totalCount[0]?.count || 0, offset, limit };

  ctx.status = 200;
  ctx.body = items;
};
