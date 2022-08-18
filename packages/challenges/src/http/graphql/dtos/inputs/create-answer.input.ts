import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field()
  repository_link: string;

  @Field()
  id_challenge: string;
}
