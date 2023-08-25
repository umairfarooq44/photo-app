import * as mongoose from 'mongoose';
import { IComment } from '../../typings/comment';
import comment from '../schema/comment';

const commentModel = mongoose.model<IComment>('Comment', comment);

export default commentModel;
