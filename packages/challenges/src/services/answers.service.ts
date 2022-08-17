import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

import { CreateAnswerInput } from '../http/graphql/dtos/inputs/create-answer.input';

import { FetchAnswersArgs } from '../http/graphql/dtos/args/fetch-answers.args';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}

  async find({ skip, take, query }: FetchAnswersArgs) {
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

    const answers = await this.prisma.answers.findMany({
      skip,
      take,
      // where,
      orderBy: {
        created_at: 'desc',
      },
    });

    const count = await this.prisma.answers.count({
      // where,
    });

    const page = Math.ceil(skip / take + 1);
    const totalPages = Math.ceil(count / take);
    const nextPage = page === totalPages || totalPages === 0 ? null : page + 1;
    const prevPage = page <= 1 ? null : page - 1;

    return {
      page: page,
      results_per_page: take,
      results_size: answers.length,
      total_results_size: count,
      total_pages: totalPages,
      next_page: nextPage,
      prev_page: prevPage,
      results: answers,
    };
  }

  // async create({ title, description }: CreateAnswerInput) {
  //   return this.prisma.answers.create({
  //     data: {
  //       grade: 1,
  //       // title,
  //       // description,
  //     },
  //   });
  // }
}
