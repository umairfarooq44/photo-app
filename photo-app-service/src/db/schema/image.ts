import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

export default ImageSchema;
