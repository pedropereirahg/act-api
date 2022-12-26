import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import compress from '@fastify/compress';
import helmet from '@fastify/helmet';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Env } from './commons/environment/env';
import { LoggingInterceptor } from './commons/interceptors/logging.interceptor';
import { AppLogger } from './commons/providers/log/app-logger';

const bootstrap = async (): Promise<void> => {
  const logger = new AppLogger();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
      maxParamLength: 1000,
      bodyLimit: 12485760, // 10MB
    }),
    { logger }
  );

  app.enableCors({
    origin: Env.ALLOWED_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  } as CorsOptions);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.register(helmet, {
    contentSecurityPolicy: false,
  });

  await app.register(compress);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const swaggerDocumentBuilder = new DocumentBuilder()
    .setTitle(Env.SWAGGER_TITLE)
    .setDescription(Env.SWAGGER_DESCRIPTION)
    .setVersion(Env.APPLICATION_VERSION)
    .setContact('Atividade Escolar', 'https://www.atividadeescolar.com.br/', 'pedropereirahg@gmail.com');

  Env.SWAGGER_SERVER.map((swaggerServer) =>
    swaggerDocumentBuilder.addServer(swaggerServer),
  );

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  };

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder.build(),
    swaggerDocumentOptions,
  );

  SwaggerModule.setup(Env.SWAGGER_DOCS, app, swaggerDocument);

  await app
    .listen(Env.APPLICATION_PORT, '0.0.0.0')
    .then(() => logger.log(`API Listen on ${Env.APPLICATION_PORT}`))
    .catch((error: any) => logger.error(error));
};

bootstrap();
