import { Logger } from '@nestjs/common';
import { LogProvider } from '../../helpers/logger';

export class NestjsLogger extends LogProvider {
  private logger: Logger;

  constructor() {
    super();
    this.logger = new Logger();
  }

  add(context, data): void {
    this.logger.log(JSON.stringify(data), context);
  }

  log(data): void {
    this.logger.log(data, this.context);
  }

  error(data: Error): void {
    this.logger.log(data, this.context);
  }

  debug(data): void {
    this.logger.log(data, this.context);
  }

  warn(data): void {
    this.logger.log(data, this.context);
  }

  alert(data): void {
    this.logger.log(data, this.context);
  }

  verbose(data): void {
    this.logger.log(data, this.context);
  }

  info(data): void {
    this.logger.log(data, this.context);
  }
}
