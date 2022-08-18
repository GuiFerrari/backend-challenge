import { ApolloDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'node:path';

import { DatabaseModule } from '../database/database.module';
import { MessagingModule } from '../messaging/messaging.module';

import { ChallengesResolver } from './graphql/resolvers/challenges.resolver';
import { ChallengesService } from '../services/challenges.service';

import { AnswersResolver } from './graphql/resolvers/answers.resolver';
import { AnswersService } from '../services/answers.service';

@Module({
  imports: [
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    ChallengesResolver,
    ChallengesService,
    AnswersResolver,
    AnswersService,
  ],
})
export class HttpModule {}
