/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearch from "elasticsearch";
import { dynamoService } from './dynamo.service';
import { configService } from "./config.service";
import { ELASTIC_SEARCH_CONFIG } from "../config/elasticsearch.config";

class ElasticSearchService {
  elasticsearchClient = new elasticsearch.Client({
    hosts: [configService.elasticSearchHost],
  });

  createIndex(body: any): Promise<any> {
    return this.elasticsearchClient.indices.create({
      index: configService.elasticSearchIndex,
      body,
    });
  }

  deleteIndex(): Promise<any> {
    return this.elasticsearchClient.indices
      .delete({
        index: configService.elasticSearchIndex,
      })
      .catch(() => {
        // Ignore error
      });
  }

  refreshIndex(): Promise<any> {
    return this.elasticsearchClient.indices.refresh();
  }

  async loadData(): Promise<any> {
    const items: any = await dynamoService.loadAllItems();
    const promises: Promise<any>[] = [];
    for (let item of items) {
      promises.push(this.index(item));
    }
    return Promise.all(promises);
  }

  async load(): Promise<any> {
    await this.deleteIndex();
    await this.createIndex(ELASTIC_SEARCH_CONFIG);
    await this.loadData();
    await this.refreshIndex();
  }

  async wipeIndex(): Promise<any> {
    return this.elasticsearchClient.indices.delete(
      {
        index: "_all",
      },
      function (err, res) {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Indexes have been deleted!", res);
        }
      }
    );
  }

  async index(document: any): Promise<any> {
    const id = document.id;
    const type = id.split("-")[0];
    delete document.imgs;
    return this.elasticsearchClient.index(
      {
        index: configService.elasticSearchIndex,
        type: "_doc",
        id,
        body: {
          ...document,
          type,
        },
      },
      (err, resp, status) => {
        if (err) {
          return console.error(err);
        }
        console.log(resp._id, status);
      }
    );
  }
}

export const elasticSearchService = new ElasticSearchService();
