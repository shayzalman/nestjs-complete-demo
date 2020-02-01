import {Module} from "@nestjs/common";
import {TodoModule} from "./components/todo/todo.module";
import {MongooseModule} from "@nestjs/mongoose";
import {conf} from "./conf/config";

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot(
      conf.db.uri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
