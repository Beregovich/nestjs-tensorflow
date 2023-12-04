/**Elasticsearch 7
 * */
export const createIndexRequestSettings = {
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
      autocomplete_analyzer: {
        type: 'custom',
        tokenizer: 'autocomplete_tokenizer',
        filter: ['lowercase'],
      },
    },
    tokenizer: {
      standard: {
        type: 'standard',
        max_token_length: 15,
      },
      autocomplete_tokenizer: {
        type: 'edge_ngram',
        min_gram: 3,
        max_gram: 30,
        token_chars: ['letter', 'digit', 'whitespace'],
      },
    },
  },
};
/**Elasticsearch 7
 * */
export const elasticSessionsMapping = {
  properties: {
    id: { type: 'integer', index: true },
    problemDescription: {
      type: 'text',
      search_analyzer: 'full_text_search_analyzer',
      analyzer: 'full_text_search_analyzer',
      fields: {
        complete: {
          type: 'text',
          analyzer: 'autocomplete_analyzer',
          search_analyzer: 'autocomplete_analyzer',
        },
      },
    },
    courseId: { type: 'integer', index: true },
    likesCount: { type: 'integer', index: true },
    dislikesCount: { type: 'integer', index: true },
    isResolved: { type: 'boolean', index: true },
  },
};
