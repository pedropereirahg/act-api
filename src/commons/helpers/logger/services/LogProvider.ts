import { v4 as uuidV4 } from 'uuid';
import { ILogLevel } from '../interfaces/ILogLevel';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LogProvider {
  type HeaderValue = string | undefined;
  export type Headers = {
    'X-Correlation-Id'?: HeaderValue;
    'X-Tenant-Id'?: HeaderValue;
    'X-Channel-Id'?: HeaderValue;
    'X-Version'?: HeaderValue;
    [key: string]: HeaderValue;
  };

  export type Context = string;
  export type Result = void;
  export type Input = any;
  export type Format = {
    'X-Correlation-Id'?: HeaderValue;
    'X-Tenant-Id'?: HeaderValue;
    'X-Channel-Id'?: HeaderValue;
    'X-Version'?: HeaderValue;
    message: any;
    context: Context;
    level: ILogLevel;
    stacktrace?: string;
  };
}
export abstract class LogProvider {
  private contextName: LogProvider.Context = 'undefined context';

  private headersLog: LogProvider.Headers = {};

  abstract log(data: LogProvider.Input): LogProvider.Result;

  abstract info(data: LogProvider.Input): LogProvider.Result;

  abstract error(data: Error): LogProvider.Result;

  abstract warn(data: LogProvider.Input): LogProvider.Result;

  abstract debug(...data: LogProvider.Input[]): LogProvider.Result;

  abstract verbose(...data: LogProvider.Input[]): LogProvider.Result;

  abstract alert(data: LogProvider.Input): LogProvider.Result;

  set context(context: LogProvider.Context) {
    if (context) {
      this.contextName = context;
    }
  }

  get context(): LogProvider.Context {
    return this.contextName;
  }

  set headers(headers: LogProvider.Headers) {
    if (
      typeof headers === 'object' &&
      Object.prototype.toString.call(headers) === '[object Object]'
    ) {
      this.headersLog['X-Correlation-Id'] =
        headers['x-correlation-id'] || headers['X-Correlation-Id'] || uuidV4();
      this.headersLog['X-Tenant-Id'] =
        headers['x-tenant-id'] || headers['X-Tenant-Id'];
      this.headersLog['X-Channel-Id'] =
        headers['x-channel-id'] || headers['X-Channel-Id'];
      this.headersLog['X-Version'] =
        headers['x-version'] || headers['X-Version'];
    }
  }

  get headers(): LogProvider.Headers {
    return this.headersLog;
  }
}
