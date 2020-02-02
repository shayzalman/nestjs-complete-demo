import {Module} from "@nestjs/common";
import {TodoModule} from "./components/todo/todo.module";
import {MongooseModule} from "@nestjs/mongoose";
import {conf} from "./conf/config";
import {UserModule} from './components/user/user.module';
import {AuthModule} from "./components/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      conf.db.uri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    ),
    TodoModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
