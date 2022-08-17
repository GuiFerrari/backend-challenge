import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

import { CreateChallengeInput } from '../http/graphql/dtos/inputs/create-challenge.input';
import { UpdateChallengeInput } from '../http/graphql/dtos/inputs/update-challenge.input';

import { FetchChallengesArgs } from '../http/graphql/dtos/args/fetch-challenges.args';

@Injectable()
export class ChallengesService {
  constructor(private prisma: PrismaService) {}

  async find({ skip, take, query }: FetchChallengesArgs) {
    const where = query
      ? {
          title: {
            search: query,
          },
          description: {
            search: query,
          },
        }
      : {};

    const challenges = await this.prisma.challenge.findMany({
      skip,
      take,
      where,
    });

    const count = await this.prisma.challenge.count({
      where,
    });

    // Corrigir nextPage
    const page = Math.ceil(skip / take + 1);
    const totalPages = Math.ceil(count / take);
    const nextPage = page === totalPages || totalPages === 0 ? null : page + 1;
    const prevPage = page <= 1 ? null : page - 1;

    return {
      page: page,
      results_per_page: take,
      results_size: challenges.length,
      total_results_size: count,
      total_pages: totalPages,
      next_page: nextPage,
      prev_page: prevPage,
      results: challenges,
    };
  }

  findById(id: string) {
    return this.prisma.challenge.findUnique({
      where: { id },
    });
  }

  async create({ title, description }: CreateChallengeInput) {
    return this.prisma.challenge.create({
      data: {
        title,
        description,
      },
    });
  }

  update(id: string, updateChallengeInput: UpdateChallengeInput) {
    return this.prisma.challenge.update({
      where: { id },
      data: updateChallengeInput,
    });
  }

  remove(id: string) {
    return this.prisma.challenge.delete({ where: { id } });
  }
}
