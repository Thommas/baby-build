/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

 import * as AWS from 'aws-sdk';

 class S3Service {
   async storeBase64File(path: string, base64Data: any) {
     const s3 = new AWS.S3();
     const bucket: string = 'FIXME'; // configService.s3Bucket;
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
       .then(() => {
         return `https://${bucket}.s3.amazonaws.com/${key}`;
       })
       .catch(() => {
         return null;
       })
   }
 }

 export const s3Service = new S3Service();
