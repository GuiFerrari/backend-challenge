import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field()
  title: string;

  @Field()
  description: string;
}
