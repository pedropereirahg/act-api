import { ILogLevel } from './ILogLevel';

export interface ILogService {
  startAt(): void;

  endAt(): void;

  sendLog(type: ILogLevel): void;

  log(message: any, level?: ILogLevel, stacktrace?: any): void;

  add(key: string, value: any): void;

  info(value: any): void;

  error(error: Error): void;

  err(error: Error): void;

  debug(value: any): void;

  warn(value: any): void;
}
