import { IComment } from '../typings/comment';
import commentModel from '../db/models/comment';

// Create Comment and return object
export const createComment = async (comment: IComment) => {
  const newComment = new commentModel({
    ...comment
  });
  await newComment.save();
  return newComment.toObject();
};

export const getCommentList = async (
  query: any,
  offset: number,
  limit: number
) => {
  return await commentModel.aggregate([
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $match: query },
          { $skip: offset },
          { $limit: limit }
        ],
        totalCount: [{ $match: query }, { $count: 'count' }]
      }
    }
  ]);
};
