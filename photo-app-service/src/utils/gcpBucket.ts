import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: `./emerald-metrics-396907-05ae48cfcbf7.json`
});

const bucketName = 'photo-app-demo';
export const bucket = storage.bucket(bucketName);
