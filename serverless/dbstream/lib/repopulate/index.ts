/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as AWS from 'aws-sdk';
import {
  wipeIndex,
  index,
  fetchAll,
  refreshIndex,
} from '../services';

async function loadData(): Promise<any> {
  const promises: Promise<any>[] = [];
  await fetchAll().then((items) => {
    for (const item of items) {
      const document = AWS.DynamoDB.Converter.unmarshall(item);
      promises.push(index(document));
    }
  });
  return Promise.all(promises);
}

async function loadLinkData(): Promise<any> {
  const promises: Promise<any>[] = [];
  await fetchAll().then((items) => {
    for (const item of items) {
      const document = AWS.DynamoDB.Converter.unmarshall(item);
      promises.push(index(document));
    }
  });
  return Promise.all(promises);
}

async function repopulate(): Promise<any> {
  await wipeIndex();
  await loadData();
  await refreshIndex();
  await loadLinkData();
}
repopulate();
