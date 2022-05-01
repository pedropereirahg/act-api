export interface IData extends Record<string, any> {
  noIntercept?: boolean;
  data?: any | Record<string, any>;
}

export interface ISendObject extends Record<string, any> {
  statusCode: null | string | number;
  status: null | string;
  data: undefined | null | Record<string, any>;
}

export interface IError extends Record<string, any> {
  message?: string;
  getStatus?: () => number;
}
