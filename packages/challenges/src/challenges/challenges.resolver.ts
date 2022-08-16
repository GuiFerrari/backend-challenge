import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ChallengesService } from './challenges.service';
import { Challenge } from './entities/challenge.entity';

import { CreateChallengeInput } from './dto/inputs/create-challenge.input';
import { UpdateChallengeInput } from './dto/inputs/update-challenge.input';
import { FetchChallengesArgs } from './dto/args/fetch-challenges.args';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(private readonly challengesService: ChallengesService) {}

  @Mutation(() => Challenge)
  createChallenge(
    @Args('createChallengeInput') createChallengeInput: CreateChallengeInput,
  ) {
    return this.challengesService.create(createChallengeInput);
  }

  @Query(() => [Challenge], { name: 'challenges' })
  findAll(@Args() { skip, take }: FetchChallengesArgs) {
    return this.challengesService.findAll({ skip, take });
  }

  @Query(() => Challenge, { name: 'challenge' })
  findOne(@Args('id') id: string) {
    console.log('id', id);
    return this.challengesService.findOne(id);
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
