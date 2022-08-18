import { Field, Int, ArgsType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

import { AnswerStatus } from '../../models/answer.model';

@ArgsType()
export class FetchAnswersArgs {
  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take = 25;

  @Field({ nullable: true })
  challenge_title: string;

  @Field({ nullable: true })
  start_date: Date;

  @Field({ nullable: true })
  end_date: Date;

  @Field(() => AnswerStatus, { nullable: true })
  status: AnswerStatus;
}
