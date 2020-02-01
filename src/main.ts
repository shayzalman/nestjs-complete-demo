import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {conf} from "./conf/config";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Swagger options
  const options = new DocumentBuilder()
      .setTitle('Todo Demo app')
      .setDescription('The Todo API description')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(conf.app.port);
}
bootstrap();
