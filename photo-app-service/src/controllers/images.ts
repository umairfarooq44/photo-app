import { IImage } from '../typings/image';
import imageModel from '../db/models/image';
import { File } from 'formidable';
import { bucket } from '../utils/gcpBucket';

// Create Image and return object
export const createImage = async (image: IImage) => {
  const newImage = new imageModel({
    ...image
  });
  await newImage.save();
  return newImage.toObject();
};

export const getImageList = async (
  query: any,
  offset: number,
  limit: number
) => {
  return await imageModel.aggregate([
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

export const uploadFileOnGCP = async (image: File) => {
  const { filepath, mimetype } = image;

  const data = await bucket.upload(filepath, {
    contentType: mimetype as string
  });
  const info = data?.[1] as { bucket: string; name: string };
  return `https://storage.googleapis.com/${info?.bucket}/${info?.name}`;
};
