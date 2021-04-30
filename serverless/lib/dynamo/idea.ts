/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

// import { orderBy } from 'lodash';
import { dynamoService } from '../services';

export function getIdeas(ids: string[], total: number, page: number) {
  return dynamoService.batchGet(ids).then((items: any) => {
    console.log('items', items);
    return {
      total,
      page,
      nodes: items
      // nodes: orderBy(items, [
      //   (item: any) => new Date(item.createdAt),
      //   'id',
      // ], [
      //   'desc',
      //   'asc',
      // ]),
    }
  });
}
