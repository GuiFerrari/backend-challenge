import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Challenge } from './challenge.model';

export enum AnswerStatus {
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

  @Field()
  repository_link: string;

  @Field(() => AnswerStatus)
  status: AnswerStatus;

  @Field()
  grade: number;

  @Field()
  created_at: Date;

  @Field(() => Challenge)
  challenge: Challenge;

  id_challenge: string;
}
