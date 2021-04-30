/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

 import * as AWS from 'aws-sdk';
 import { configService } from './config.service';

 class SQSService {
   private sqs;

   constructor() {
     this.sqs = new AWS.SQS();
   }

   async sendMessage(messageBody: string) {
     if (!configService.sqsQueueUrl) {
       return;
     }

     var params = {
       MessageBody: messageBody,
       QueueUrl: configService.sqsQueueUrl
     };

     return this.sqs.sendMessage(params).promise()
       .then((data) => data.MessageId);
   }
 }

 export const sqsService = new SQSService();
