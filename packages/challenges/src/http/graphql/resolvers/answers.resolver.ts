import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { AnswersService } from '../../../services/answers.service';
import { ChallengesService } from '../../../services/challenges.service';

import { Answer } from '../models/answer.model';
import { Challenge } from '../models/challenge.model';

import { FetchAnswersArgs } from '../dtos/args/fetch-answers.args';
import { ReturnAnswers } from '../dtos/returns/return-all-answers';
import { CreateAnswerInput } from '../dtos/inputs/create-answer.input';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(
    private answersService: AnswersService,
    private challengeService: ChallengesService,
  ) {}

  @Query(() => ReturnAnswers, { name: 'answers' })
  findAll(
    @Args()
    {
      skip,
      take,
      challenge_title,
      start_date,
      end_date,
      status,
    }: FetchAnswersArgs,
  ) {
    return this.answersService.find({
      skip,
      take,
      challenge_title,
      start_date,
      end_date,
      status,
    });
  }

  @ResolveField(() => Challenge)
  challenge(@Parent() answer: Answer) {
    return this.challengeService.findById(answer.id_challenge);
  }

  @Mutation(() => Answer)
  createAnswer(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
  ) {
    return this.answersService.create(createAnswerInput);
  }
}
