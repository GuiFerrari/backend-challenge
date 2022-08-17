import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AnswersService } from '../../../services/answers.service';
import { ChallengesService } from '../../../services/challenges.service';

import { Answer } from '../models/answer.model';
import { Challenge } from '../models/challenge.model';

import { FetchAnswersArgs } from '../dtos/args/fetch-answers.args';
import { ReturnAnswers } from '../dtos/returns/return-all-answers';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(
    private answersService: AnswersService,
    private challengeService: ChallengesService,
  ) {}

  @Query(() => ReturnAnswers, { name: 'answers' })
  findAll(@Args() { skip, take, query }: FetchAnswersArgs) {
    return this.answersService.find({ skip, take, query });
  }

  @ResolveField(() => Challenge)
  challenge(@Parent() answer: Answer) {
    return this.challengeService.findById(answer.id_challenge);
  }

  // @Mutation(() => Challenge)
  // createChallenge(
  //   @Args('createChallengeInput') createChallengeInput: CreateChallengeInput,
  // ) {
  //   return this.answersService.create(createChallengeInput);
  // }
}
