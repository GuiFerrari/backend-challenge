import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ChallengesService } from '../../../services/challenges.service';

import { Challenge } from '../models/challenge.model';

import { CreateChallengeInput } from '../dtos/inputs/create-challenge.input';
import { UpdateChallengeInput } from '../dtos/inputs/update-challenge.input';
import { FetchChallengesArgs } from '../dtos/args/fetch-challenges.args';
import { ReturnChallenges } from '../dtos/returns/return-all-challenges';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(private challengesService: ChallengesService) {}

  @Query(() => ReturnChallenges, { name: 'challenges' })
  findAll(@Args() { skip, take, query }: FetchChallengesArgs) {
    return this.challengesService.find({ skip, take, query });
  }

  @Mutation(() => Challenge)
  createChallenge(
    @Args('createChallengeInput') createChallengeInput: CreateChallengeInput,
  ) {
    return this.challengesService.create(createChallengeInput);
  }

  @Mutation(() => Challenge)
  updateChallenge(
    @Args('updateChallengeInput') updateChallengeInput: UpdateChallengeInput,
  ) {
    return this.challengesService.update(
      updateChallengeInput.id,
      updateChallengeInput,
    );
  }

  @Mutation(() => Challenge)
  removeChallenge(@Args('id') id: string) {
    return this.challengesService.remove(id);
  }
}
