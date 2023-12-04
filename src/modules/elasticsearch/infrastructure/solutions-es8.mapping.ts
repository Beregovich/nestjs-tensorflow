// import { MappingTypeMapping } from '@search/elasticsearch/lib/api/typesWithBodyKey';
// import { IndicesIndexSettings } from '@search/elasticsearch/lib/api/types';
/**Elasticsearch 8
 * */
export const createIndexRequestSettings /*: IndicesIndexSettings*/ = {
  max_ngram_diff: 30,
  analysis: {
    filter: {
      autocomplete_filter: {
        type: 'edge_ngram',
        min_gram: 1,
        max_gram: 20,
      },
    },
    analyzer: {
      full_text_search_analyzer: {
        type: 'standard',
      },
      ngram_analyzer: {
        type: 'custom',
        tokenizer: 'ngram_tokenizer',
        filter: ['lowercase'],
      },
      //Отрабатывает хуже
      // autocomplete_analyzer: {
      //   type: 'custom',
      //   tokenizer: 'autocomplete',
      //   filter: ['lowercase'],
      // },
      // autocomplete_search_analyzer: {
      //   type: 'custom',
      //   tokenizer: 'keyword',
      //   filter: ['lowercase'],
      // },
      autocomplete_analyzer: {
        type: 'custom',
        tokenizer: 'standard',
        filter: ['lowercase', 'autocomplete_filter'],
      },
      autocomplete_search_analyzer: {
        type: 'custom',
        tokenizer: 'keyword',
        filter: ['lowercase'],
      },
    },
    tokenizer: {
      standard: {
        type: 'standard',
        max_token_length: 15,
      },
      ngram_tokenizer: {
        type: 'ngram',
        min_gram: 3,
        max_gram: 10,
        token_chars: ['letter', 'digit'],
      },
      autocomplete: {
        type: 'edge_ngram',
        min_gram: 1,
        max_gram: 30,
        token_chars: ['letter', 'digit', 'whitespace'],
      },
    },
  },
};

/**Elasticsearch 8
 * */
export const elasticSessionsMapping /*: MappingTypeMapping */ = {
  properties: {
    date: { type: 'date', index: false },
    mentor: {
      type: 'nested',
      properties: { name: { type: 'text' } },
    },
    category: { type: 'integer', index: false },
    problemDescription: {
      type: 'text',
      search_analyzer: 'ngram_analyzer',
      analyzer: 'ngram_analyzer',
      fields: {
        complete: {
          type: 'text',
          analyzer: 'autocomplete_analyzer',
          //search_analyzer: 'autocomplete_search_analyzer',
          search_analyzer: 'standard',
        },
      },
    },
    solution: {
      type: 'nested',
      properties: {
        description: { type: 'text' },
        /**
         * In Elasticsearch, arrays do not require a dedicated field data type.
         * Any field can contain zero or more values by default, however,
         * all values in the array must be of the same field type
         * */
        screenshotsUrls: { type: 'nested' },
      },
    },
    linkToVideo: { type: 'text', index: false },
  },
};
