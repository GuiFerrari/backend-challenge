import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Challenge {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  created_at: Date;
}
