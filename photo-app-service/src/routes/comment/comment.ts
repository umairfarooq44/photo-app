import { Context } from 'koa';
import { getCommentsQueryPayload, addCommentPayload } from './validation';
import { createComment, getCommentList } from '../../controllers/comments';

export const getComments = async (ctx: Context) => {
  const { offset, limit, imageId } = await getCommentsQueryPayload.validate(
    { ...ctx.query },
    { stripUnknown: true }
  );

  const comments = await getCommentList({ imageId }, offset, limit);
  const { data, totalCount } = comments[0];
  const items = { data, total: totalCount[0]?.count || 0, offset, limit };

  ctx.status = 200;
  ctx.body = items;
};

export const addComment = async (ctx: Context) => {
  const data = await addCommentPayload.validate(
    { ...ctx.request.body },
    { stripUnknown: true }
  );
  const item = { ...data };

  const comment = await createComment(item);
  ctx.status = 200;
  ctx.body = { ...comment };
};
