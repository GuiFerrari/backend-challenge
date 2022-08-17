import { Field, ObjectType } from '@nestjs/graphql';

import { Answer } from '../../models/answer.model';

@ObjectType()
export class ReturnAnswers {
  @Field()
  page: number;

  @Field()
  results_per_page: number;

  @Field()
  results_size: number;

  @Field()
  total_results_size: number;

  @Field()
  total_pages: number;

  @Field({ nullable: true })
  next_page?: number;

  @Field({ nullable: true })
  prev_page?: number;

  @Field(() => [Answer])
  results: Answer[];
}
