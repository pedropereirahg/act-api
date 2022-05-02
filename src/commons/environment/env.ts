import * as dotenv from 'dotenv';

dotenv.config();
export abstract class Env {
  public static readonly NODE_ENV: string =
    process.env.NODE_ENV || 'development';

  public static readonly APPLICATION_PORT: number =
    parseInt(process.env.APPLICATION_PORT, 10) || 3000;

  public static readonly APPLICATION_VERSION: string =
    process.env.APPLICATION_VERSION;

  public static readonly SWAGGER_TITLE: string = process.env.SWAGGER_TITLE;

  public static readonly SWAGGER_DESCRIPTION: string =
    process.env.SWAGGER_DESCRIPTION;

  public static readonly SWAGGER_DOCS: string = process.env.SWAGGER_DOCS;

  public static readonly SWAGGER_SERVER: string = process.env.SWAGGER_SERVER;

  public static readonly DATABASE_URI: string = process.env.DATABASE_URI;
}
