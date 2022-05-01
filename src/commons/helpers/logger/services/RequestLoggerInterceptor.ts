import { InfraLogger } from './InfraLogger';
import { LogProvider } from './LogProvider';

export class RequestLoggerInterceptor {
  private logger: LogProvider;

  constructor(loggerClass?: LogProvider) {
    this.logger = loggerClass ? loggerClass : new InfraLogger();
  }

  public intercept(context: any, next: any): any {
    const request = context.switchToHttp().getRequest();
    request.headers['x-correlation-id'] =
      request.headers['x-correlation-id'] ??
      request.headers['X-Correlation-Id'] ??
      this.logger.headers['X-Correlation-Id'];
    this.logger.headers = request.headers;
    this.logger.context = context.getClass().name;
    request.logger = this.logger;
    return next.handle();
  }
}
