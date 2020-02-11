import {Module} from "@nestjs/common";
import {TodoModule} from "./components/todo/todo.module";
import {MongooseModule} from "@nestjs/mongoose";
import {conf} from "./conf/config";
import {UserModule} from './components/user/user.module';
import {AuthModule} from "./components/auth/auth.module";
import {GraphQLModule} from "@nestjs/graphql";
import {PubSub} from 'graphql-subscriptions';

@Module({
  imports: [
    MongooseModule.forRoot(
      conf.db.uri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    ),
    GraphQLModule.forRoot({
      playground: process.env.NODE_ENV === 'DEV',
      debug: process.env.NODE_ENV === 'DEV',
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req, res }) => ({ req, res }),
      path: '/api/gql' //custom end-point
    }),
    TodoModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    }
  ]
})
export class AppModule {}
