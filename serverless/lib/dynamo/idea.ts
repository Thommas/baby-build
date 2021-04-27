/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

// import { orderBy } from 'lodash';
import { dynamoService } from '../services';

export function getIdeas(params: any, total: number, page: number) {
  return dynamoService.getEntity().batchGet(params).then((items: any) => {
    return {
      total,
      page,
      nodes: items.toJSON()
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
