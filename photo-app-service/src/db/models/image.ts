import * as mongoose from 'mongoose';
import { IImage } from '../../typings/image';
import image from '../schema/image';

const imageModel = mongoose.model<IImage>('Image', image);

export default imageModel;
