import { Field, ObjectType } from '@nestjs/graphql';

import { Challenge } from '../../models/challenge.model';

@ObjectType()
export class ReturnChallenge {
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

  @Field(() => [Challenge])
  results: Challenge[];
}
