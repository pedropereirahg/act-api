import * as dotenv from 'dotenv';

dotenv.config();
export abstract class Env {
  public static readonly NODE_ENV: string =
    process.env.NODE_ENV || 'development';

  public static readonly APPLICATION_PORT: number =
    parseInt(process.env.PORT, 10) ||
    parseInt(process.env.APPLICATION_PORT, 10);

  public static readonly APPLICATION_VERSION: string =
    process.env.APPLICATION_VERSION;

  public static readonly ALLOWED_ORIGINS: string[] =
    process.env.ALLOWED_ORIGINS &&
    Array.isArray(process.env.ALLOWED_ORIGINS.split(','))
      ? process.env.ALLOWED_ORIGINS.split(',')
      : [];

  public static readonly SWAGGER_TITLE: string = process.env.SWAGGER_TITLE;

  public static readonly SWAGGER_DESCRIPTION: string =
    process.env.SWAGGER_DESCRIPTION;

  public static readonly SWAGGER_DOCS: string = process.env.SWAGGER_DOCS;

  public static readonly SWAGGER_SERVER: string[] =
    process.env.SWAGGER_SERVER &&
    Array.isArray(process.env.SWAGGER_SERVER.split(','))
      ? process.env.SWAGGER_SERVER.split(',')
      : [];

  public static readonly DATABASE_URI: string = process.env.DATABASE_URI;
}
