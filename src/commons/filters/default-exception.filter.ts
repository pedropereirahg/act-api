import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class DefaultExceptionsFilter implements ExceptionFilter {
  parseMessages(messages: string[]) {
    return messages.reduce((acc: any, cur: string) => {
      const key = cur.split(' ').shift();
      const hasKey = Object.keys(acc).includes(key);

      if (!hasKey) {
        acc[key] = [];
      }

      acc[key].push(cur.replace(key, '').slice(1));
      return acc;
    }, {});
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const httpResponse = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errors: any;
    let data = null;
    if (exception instanceof HttpException) {
      const { message } = exception;
      const response = exception.getResponse();
      data = (response as { data: any })?.data;
      if (
        typeof response === 'object' &&
        typeof (response as { message: ['string'] }).message === 'object'
      ) {
        errors = this.parseMessages(
          (response as { message: ['string'] }).message,
        );
      } else if (typeof message === 'string') {
        errors = message;
      } else {
        errors = null;
      }
    } else if (
      typeof exception === 'object' &&
      typeof (exception as { message: 'string' }).message === 'string'
    ) {
      errors = (exception as { message: 'string' }).message;
    } else {
      errors =
        typeof exception === 'string' ? exception : JSON.stringify(exception);
    }

    if (data) {
      return httpResponse.status(status).send({
        statusCode: status,
        status: status === 500 ? 'fail' : 'error',
        errors,
        data,
      });
    }

    return httpResponse.status(status).send({
      statusCode: status,
      status: status === 500 ? 'fail' : 'error',
      errors,
    });
  }
}
