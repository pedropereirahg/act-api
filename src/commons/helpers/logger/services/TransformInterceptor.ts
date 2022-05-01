import { throwError } from 'rxjs';
import {
  IData,
  IError,
  ISendObject,
} from '../interfaces/ITransformInterceptor';

export class TransformInterceptor {
  public responseData: ISendObject = {
    statusCode: null,
    status: null,
    data: {},
  };

  public transformResponse(data: IData | undefined, response: any) {
    if (data?.noIntercept) {
      return data;
    }

    this.responseData.statusCode = response.statusCode;
    this.responseData.status = 'success';
    this.responseData.data = data;

    if (data?.data) {
      const { data: result, ...rest } = data;
      this.responseData.data = result;
      this.responseData = {
        ...this.responseData,
        ...rest,
      };
    }

    return this.responseData;
  }

  public transformError(error: IError) {
    let message: undefined | IError | string = error;

    if (error.message) {
      message = error.message;
    } else if (typeof error === 'object') {
      message = JSON.stringify(error);
    }

    this.responseData.statusCode =
      typeof error?.getStatus === 'function' ? error.getStatus() : 500;
    this.responseData.status = 'fail';
    this.responseData.data = { error: message };

    return throwError(() => error);
  }
}
