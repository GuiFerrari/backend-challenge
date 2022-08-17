import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Challenge } from './challenge.model';

enum AnswerStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

registerEnumType(AnswerStatus, {
  name: 'AnswerStatus',
  description: 'Available answer statuses',
});

@ObjectType()
export class Answer {
  @Field(() => ID)
  id: string;

  @Field(() => AnswerStatus)
  status: AnswerStatus;

  @Field()
  created_at: Date;

  @Field(() => Challenge)
  challenge: Challenge;

  id_challenge: string;
}
