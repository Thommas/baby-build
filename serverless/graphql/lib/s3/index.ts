/**
 * Path of child
 *
 * GraphQL - S3
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as AWS from 'aws-sdk';
import { configService } from '../services';

export async function storeBase64File(path: string, base64Data: any) {
  const s3 = new AWS.S3();
  const bucket: string = configService.s3Bucket;
  const body: Buffer = new Buffer(base64Data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const type: string = base64Data.split(';')[0].split('/')[1];
  const key: string = `${path}.${type}`;

  return s3.putObject({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
    ACL: 'public-read',
  })
    .promise()
    .then((res) => {
      return `https://${bucket}.s3.amazonaws.com/${key}`;
    })
    .catch((err) => {
      return null;
    })
}
