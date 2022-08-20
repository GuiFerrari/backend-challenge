import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { PrismaService } from './database/prisma/prisma.service';

interface CorrectLessonMessage {
  value: {
    submissionId: string;
    repositoryUrl: string;
  };
}

enum AnswerStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

interface CorrectLessonResponse {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: AnswerStatus;
}

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @MessagePattern('challenge.correction')
  async correctLesson(
    @Payload() message: CorrectLessonMessage,
  ): Promise<CorrectLessonResponse> {
    console.log('message.value: ', message.value);
    const { submissionId, repositoryUrl } = message.value;

    const response: CorrectLessonResponse = {
      submissionId,
      repositoryUrl,
      grade: Math.floor(Math.random() * 10) + 1,
      status: AnswerStatus.DONE,
    };

    await this.prisma.answers.update({
      where: {
        id: submissionId,
      },
      data: {
        grade: response.grade,
        status: AnswerStatus.DONE,
      },
    });

    return response;
  }
}
