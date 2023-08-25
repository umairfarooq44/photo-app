import * as yup from 'yup';
import { File } from 'formidable';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const validFileExtensions = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'];

const isValidFileType = (fileName: string) => {
  return fileName
    ? validFileExtensions.includes(fileName.split('.').pop() || '')
    : false;
};

export const uploadImagePayload = yup.object().shape({
  image: yup
    .mixed<File>()
    .required('Image is Required')
    .test('is-valid-type', 'Not a valid image type', value =>
      isValidFileType(
        value?.originalFilename ? value.originalFilename?.toLowerCase() : ''
      )
    )
    .test('is-valid-size', 'Max allowed size is 5MB', value =>
      value ? value.size <= MAX_FILE_SIZE : false
    )
});

export const getImagesQueryPayload = yup.object().shape({
  limit: yup.number().required().positive().integer().default(10),
  offset: yup.number().required().min(0).integer().default(0)
});
