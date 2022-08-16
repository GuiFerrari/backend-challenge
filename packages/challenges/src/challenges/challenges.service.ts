import { Injectable } from '@nestjs/common';

import { CreateChallengeInput } from './dto/inputs/create-challenge.input';
import { UpdateChallengeInput } from './dto/inputs/update-challenge.input';
import { FetchChallengesArgs } from './dto/args/fetch-challenges.args';

import { prismaClient } from '../@core/infra/db/prismaClient';

@Injectable()
export class ChallengesService {
  async create({ title, description }: CreateChallengeInput) {
    const challenge = await prismaClient.challenge.create({
      data: {
        title,
        description,
      },
    });

    return challenge;
  }

  async findAll({ skip, take }: FetchChallengesArgs) {
    const challenges = await prismaClient.challenge.findMany({
      skip,
      take,
    });

    return challenges;

    /*  Criei uma estrutura de retorno para ajudar o front-end com as informações sobre
        a páginação, mas não consegui alterar o retorno do GraphQL para aceitar as
        novas informações
    */

    // const count = await prismaClient.challenge.count();

    // const page = Math.ceil(skip / take + 1);
    // const totalPages = Math.ceil(count / take);
    // const nextPage = page === totalPages ? null : page + 1;
    // const prevPage = page <= 1 ? null : page - 1;

    // return {
    //   page: page,
    //   results_per_page: take,
    //   results_size: challenges.length,
    //   total_results_size: count,
    //   total_pages: totalPages,
    //   next_page: nextPage,
    //   prev_page: prevPage,
    //   results: challenges,
    // };
  }

  findOne(id: string) {
    return prismaClient.challenge.findUnique({ where: { id } });
  }

  update(id: string, updateChallengeInput: UpdateChallengeInput) {
    return prismaClient.challenge.update({
      where: { id },
      data: updateChallengeInput,
    });
  }

  remove(id: string) {
    return prismaClient.challenge.delete({ where: { id } });
  }
}
