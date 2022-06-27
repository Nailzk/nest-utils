import { NestFactory } from "@nestjs/core";
import { CrudRequestInterceptor } from "./interceptors";
import cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const env = process.env;

async function bootstrap(AppModule: any) {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.useGlobalInterceptors(new CrudRequestInterceptor());

    const config = new DocumentBuilder()
        .setTitle('Swagger')
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("swagger", app, document);

    await app.listen(env?.PORT ?? 3000);

    return () => app;
}