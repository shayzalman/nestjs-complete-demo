import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {conf} from "./conf/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(conf.app.port);
}
bootstrap();
