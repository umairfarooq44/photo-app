import mongoose from 'mongoose';
const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    imageId: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);
export default CommentSchema;
