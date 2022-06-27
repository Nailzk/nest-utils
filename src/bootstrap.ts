import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { CrudRequestInterceptor } from "@nestjsx/crud";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

const env = process.env as any;

export async function bootstrap(
  AppModule: any,
  beforeStartHandler?: (app: NestExpressApplication) => void,
) {
  dotenv.config();
  beforeStartHandler;

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalInterceptors(new CrudRequestInterceptor());

  const config = new DocumentBuilder()
    .setTitle(env.SERVICE || "Service")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(env.PORT || 3000);

  return app;
}
