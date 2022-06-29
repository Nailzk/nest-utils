import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { CrudRequestInterceptor } from "@nestjsx/crud";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { HttpExceptionFilter } from "./http-exception.filter";

const env = process.env as any;

const serviceName = env.SERVICE || "Service";
const PORT = env.PORT || 3000;

export async function bootstrap(
  AppModule: any,
  beforeStartHandler?: (app: NestExpressApplication) => void,
) {
  const logger = new Logger(serviceName);

  dotenv.config();
  beforeStartHandler;

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalInterceptors(new CrudRequestInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle(serviceName)
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(PORT);

  logger.log(`Application started on port ${PORT}`);

  return app;
}
