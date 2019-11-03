/**
 * Path of child - Fixtures
 *
 * Load fixtures for Elasticsearch
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

export const configuration: any = {
  settings: {
    analysis: {
      filter: {
        autocomplete_filter: {
          type: 'edge_ngram',
          min_gram: 1,
          max_gram: 20
        }
      },
      analyzer: {
        autocomplete: {
          type: 'custom',
          tokenizer: 'standard',
          filter: [
            'lowercase',
            'autocomplete_filter',
          ]
        }
      }
    }
  },
  mappings: {
    properties: {
      createdAt: {
        type: 'long',
      },
      type: {
        type: 'keyword',
      },
      firstName: {
        type: 'text',
        analyzer: 'autocomplete',
        search_analyzer: 'standard'
      },
      lastName: {
        type: 'text',
        analyzer: 'autocomplete',
        search_analyzer: 'standard'
      },
      label: {
        type: 'text',
        analyzer: 'autocomplete',
        search_analyzer: 'standard'
      },
      requiredAge: {
        type: 'double',
      },
      score: {
        type: 'double',
      },
      requiredAgeExplanation: {
        type: 'text',
        analyzer: 'autocomplete',
        search_analyzer: 'standard'
      },
      scoreExplanation: {
        type: 'text',
        analyzer: 'autocomplete',
        search_analyzer: 'standard'
      },
      xp: {
        type: 'integer',
      },
      lvl: {
        type: 'integer',
      },
      ideaId: {
        type: 'keyword',
      },
      sharerId: {
        type: 'keyword',
      },
      tagId: {
        type: 'keyword',
      },
      tagIdNested: {
        type: 'nested',
        properties: {
          tagId: {
            type: 'keyword',
          },
        }
      },
      userId: {
        type: 'keyword',
      },
    }
  }
};
