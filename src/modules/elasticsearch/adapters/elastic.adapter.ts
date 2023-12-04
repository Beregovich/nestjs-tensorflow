import { Search } from '@elastic/elasticsearch/api/requestParams';
import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AppSettings } from '../../../settings/domain/app-settings';
import { SearchQueryDto } from '../../search/dto/search-query.dto';
import { SaveSupportSessionInEsRequestDto } from '../../../dto/save-support-session-in-es-request.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ApiError } from '@elastic/elasticsearch';
import {
  createIndexRequestSettings,
  elasticSessionsMapping,
} from '../infrastructure/solutions-es7.mapping';
import { LikesDataType } from '../../sessions/types/sessions-module.type';

@Injectable()
export class ElasticAdapter {
  private readonly index: string;

  constructor(
    private readonly elasticService: ElasticsearchService,
    @Inject(AppSettings.name) private readonly appSettings: AppSettings,
  ) {
    this.index = this.appSettings.elastic.ELASTICSEARCH_INDEX;
  }

  async getAutocomplete(searchTerm: string, courseId: number) {
    const autocompleteRequest = {
      index: this.index,
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  'problemDescription.complete': {
                    query: searchTerm,
                    analyzer: 'autocomplete_analyzer',
                  },
                },
              },
            ],
            filter: {
              term: { courseId: courseId },
            },
          },
        },
        //filter_path: 'hits.hits._source.problemDescription',
        size: this.appSettings.elastic.MAX_AUTOCOMPLETE_OFFERS,
      },
    };
    const searchResponse = await this.elasticService.search(
      autocompleteRequest,
    );
    const items =
      searchResponse.body.hits.hits.length > 0
        ? searchResponse.body.hits.hits.map(
            (hit) => hit._source.problemDescription,
          )
        : [];
    return items;
    //Attention!
    //Code above work with ES v8.1
    //Not work with ES 7
    // const matchQuery : QueryDslMatchQuery = {
    //   query: searchNameTerm,
    //   analyzer: 'autocomplete_analyzer',
    // };
    // const searchSourceQuery : QueryDslQueryContainer = {
    //   match: { 'problemDescription.complete': matchQuery },
    // };
    // const searchRequest : SearchRequest  = {
    //   query: searchSourceQuery,
    //   filter_path: 'hits.hits._source.problemDescription',
    //   size: this.appSettings.search.MAX_AUTOCOMPLETE_OFFERS,
    // };
    //return searchRequest;s
  }

  async getResolvedSolutions(clientQuery: SearchQueryDto, courseId: number) {
    const index = this.index;
    const searchParams: Search<Record<string, any>> = {
      index,
      //filter_path: 'body',
      body: {
        query: {
          function_score: {
            query: {
              bool: {
                must: [
                  {
                    match: {
                      problemDescription: {
                        query: clientQuery.searchNameTerm,
                        fuzziness: 'auto',
                        analyzer: 'full_text_search_analyzer',
                        boost: this.appSettings.elastic.QUERY_BOOST,
                      },
                    },
                  },
                  {
                    match: {
                      isResolved: true,
                    },
                  },
                ],
                filter: {
                  term: { courseId: courseId },
                },
              },
            },
            field_value_factor: {
              field: 'likesCount',
              factor: 1.2,
              modifier: 'ln1p',
              missing: 0,
            },
            boost_mode: 'sum',
          },
        },
        size: clientQuery.pageSize,
        from: clientQuery.pageSize * (clientQuery.pageNumber - 1),
      },
    };
    const result = await this.elasticService.search(searchParams);
    console.log(result);
    return result;
    //Attention!
    //Code above work with ES v8.1
    //NOT work with ES 7
    //fuzziness work.
    // const matchQuery: QueryDslMatchQuery = {
    //   query: clientQuery.searchNameTerm,
    //   fuzziness: 'auto',
    //   analyzer: 'full_text_search_analyzer',
    //   boost: this.appSettings.search.QUERY_BOOST,
    // };
    //
    // const searchSourceQuery: QueryDslQueryContainer = {
    //   match: { problemDescription: matchQuery },
    //   function_score not tested
    //   function_score: {
    //     functions: [
    //       //Влияние поля лайков на оценку соответствия
    //       {
    //         field_value_factor: {
    //           field: 'LikesCount',
    //           factor: this.appSettings.search.SCORE_LIKE_FACTOR,
    //           missing: 1,
    //         },
    //       },
    //       {
    //         //Влияние поля дизлайков на оценку соответствия
    //         field_value_factor: {
    //           field: 'dislikesCount',
    //           factor: this.appSettings.search.SCORE_DISLIKE_FACTOR,
    //           missing: 1,
    //         },
    //       },
    //     ],
    //   },
    // };
  }

  async checkAndCreateIndexIfNotExist(index: string) {
    const checkExistenceResponse = await this.elasticService.indices.exists({
      index,
    });
    if (!checkExistenceResponse.body) {
      return this.createIndex(
        this.index,
        elasticSessionsMapping,
        createIndexRequestSettings,
      );
    }
    return checkExistenceResponse.body;
  }

  private async createIndex(index: string, mapping, settings) {
    return this.elasticService.indices.create({
      index,
      body: {
        mappings: mapping,
        settings,
      },
    });
  }

  async saveSessionInES(document) {
    const elasticRequest = {
      id: uuidv4(),
      index: this.index,
      document,
    };
    return this.saveSessionPromise(elasticRequest);
  }

  private async saveSessionPromise(
    elasticRequest: SaveSupportSessionInEsRequestDto,
  ): Promise<boolean | ApiError> {
    return new Promise((res, rej) => {
      this.elasticService.create(
        {
          id: elasticRequest.id.toString(),
          index: elasticRequest.index,
          body: elasticRequest.document,
        },
        (err) => {
          if (err) {
            rej(err);
          }
          res(true);
        },
      );
    });
  }

  async updateLikesData(likesData: LikesDataType) {
    return this.elasticService.updateByQuery({
      index: this.index,
      body: {
        script: {
          source: `ctx._source.likesCount=${likesData.likesCount}`,
          lang: 'painless',
        },
        query: {
          term: {
            id: likesData.sessionId,
          },
        },
      },
    });
  }
}
