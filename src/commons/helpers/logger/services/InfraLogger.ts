import { v4 as uuidV4 } from 'uuid';
import * as winston from 'winston';

import { ILogLevel } from '../interfaces/ILogLevel';
import { LogProvider } from './LogProvider';

export class InfraLogger extends LogProvider {
  private logger: winston.Logger;

  constructor(headers?: LogProvider.Headers, context?: LogProvider.Context) {
    super();
    if (headers) this.headers = headers;
    if (context) this.context = context;
    if (!this.headers['X-Correlation-Id']) {
      this.headers['X-Correlation-Id'] = uuidV4();
    }
    this.logger = winston.createLogger({
      level: 'debug',
      transports: [new winston.transports.Console()],
    });
  }

  private formatLog(
    message: LogProvider.Input,
    level: ILogLevel = ILogLevel.LOG,
    stacktrace?: LogProvider.Input,
  ): LogProvider.Format {
    return {
      ...this.headers,
      message,
      context: this.context,
      level,
      stacktrace,
    };
  }

  log(
    message: LogProvider.Input,
    level: ILogLevel = ILogLevel.LOG,
    stacktrace?: LogProvider.Input,
  ): LogProvider.Result {
    const printLog = this.formatLog(message, level, stacktrace);

    this.logger.log(printLog);
  }

  info(message: LogProvider.Input): LogProvider.Result {
    this.log(message, ILogLevel.LOG);
  }

  error(error: Error): LogProvider.Result {
    const doesNotAError = !(error instanceof Error);
    if (doesNotAError) {
      this.log(error, ILogLevel.ALERT);
      return;
    }
    this.log(error.message, ILogLevel.ERROR, error.stack);
  }

  warn(message: LogProvider.Input): LogProvider.Result {
    this.log(message, ILogLevel.WARN);
  }

  debug(...message: LogProvider.Input[]): LogProvider.Result {
    message.forEach((msg) => this.log(msg, ILogLevel.DEBUG));
  }

  verbose(...message: LogProvider.Input[]): LogProvider.Result {
    message.forEach((msg) => this.log(msg, ILogLevel.VERBOSE));
  }

  alert(message: LogProvider.Input): LogProvider.Result {
    this.log(message, ILogLevel.ALERT);
  }
}
