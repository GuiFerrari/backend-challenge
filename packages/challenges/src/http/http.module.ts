import { ApolloDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'node:path';

import { DatabaseModule } from '../database/database.module';

import { ChallengesResolver } from './graphql/resolvers/challenges.resolver';
import { ChallengesService } from '../services/challenges.service';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [ChallengesResolver, ChallengesService],
})
export class HttpModule {}
