/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as AWS from 'aws-sdk';
import { configService } from './config.service';

class S3Service {
  private s3;

  constructor() {
    this.s3 = new AWS.S3({
      region: 'local',
      endpoint: configService.s3Endpoint,
      s3ForcePathStyle: true
    });
  }

  async storeBase64File(id: string, base64Data: any): Promise<string> {
    const body: Buffer = new Buffer(base64Data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const type: string = base64Data.split(';')[0].split('/')[1];

    const key = `${id}.${type}`;
    return this.s3.putObject({
      Bucket: configService.s3Bucket,
      Key: key,
      Body: body,
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
      ACL: 'public-read',
    })
      .promise()
      .then(() => {
        return `http://localhost:4566/pathofchild-dev/${key}`;
      })
      .catch((err) => {
        console.log('err', err);
        return null;
      });
  }
}

export const s3Service = new S3Service();
