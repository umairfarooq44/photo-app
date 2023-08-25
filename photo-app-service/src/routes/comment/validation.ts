import * as yup from 'yup';

export const addCommentPayload = yup.object().shape({
  comment: yup.string().required(),
  imageId: yup.string().required()
});

export const getCommentsQueryPayload = yup.object().shape({
  limit: yup.number().required().positive().integer().default(10),
  offset: yup.number().required().min(0).integer().default(0),
  imageId: yup.string().required()
});
