import { InfraLogger, LogProvider } from '../../helpers/logger';

export class AppLogger extends LogProvider {
  private logger: InfraLogger;

  constructor() {
    super();
    this.logger = new InfraLogger({}, AppLogger.name);
  }

  log(data, context?, level?): void {
    this.logger.context = context;
    this.logger.log(data, level);
  }

  error(data: Error): void {
    this.logger.error(data);
  }

  debug(data): void {
    this.logger.debug(data);
  }

  info(data): void {
    this.logger.log(data);
  }

  warn(data): void {
    this.logger.warn(data);
  }

  verbose(data): void {
    this.logger.verbose(data);
  }

  alert(data): void {
    this.logger.alert(data);
  }
}
