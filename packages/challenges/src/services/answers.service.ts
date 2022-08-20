import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { KafkaService } from '../messaging/kafka.service';

import { CreateAnswerInput } from '../http/graphql/dtos/inputs/create-answer.input';
import { FetchAnswersArgs } from '../http/graphql/dtos/args/fetch-answers.args';
import { AnswerStatus } from '../http/graphql/models/answer.model';

import { isValidURL } from '../util/isValidURL';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

  async find({
    skip,
    take,
    challenge_title,
    start_date,
    end_date,
    status,
  }: FetchAnswersArgs) {
    const where = {};
    const createdAt = {};

    if (challenge_title) {
      Object.assign(where, {
        challenge: {
          title: {
            search: challenge_title,
          },
        },
      });
    }

    if (status) {
      Object.assign(where, {
        status: status,
      });
    }

    if (start_date) {
      Object.assign(createdAt, {
        lte: start_date,
      });
    }

    if (end_date) {
      Object.assign(createdAt, {
        gte: end_date,
      });
    }

    Object.assign(where);

    const answers = await this.prisma.answers.findMany({
      skip,
      take,
      where,
      orderBy: {
        created_at: 'desc',
      },
    });

    const count = await this.prisma.answers.count({
      where,
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

  async create({ repository_link, id_challenge }: CreateAnswerInput) {
    const challenge = await this.prisma.challenge.findUnique({
      where: {
        id: id_challenge,
      },
    });

    if (!challenge) {
      throw new Error('Challenge not found.');
    }

    const answer = await this.prisma.answers.create({
      data: {
        repository_link,
        id_challenge,
      },
    });

    const verifyUrl = isValidURL(repository_link);

    if (!verifyUrl) {
      await this.prisma.answers.update({
        where: {
          id: answer.id,
        },
        data: {
          status: AnswerStatus.ERROR,
        },
      });

      throw new Error('Repository URL is not a valid link.');
    }

    this.kafka.emit('challenge.correction', {
      submissionId: answer.id,
      repositoryUrl: answer.repository_link,
    });

    return answer;
  }
}
