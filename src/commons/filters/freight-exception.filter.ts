import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

const errorsMap = {
  'freight/invalid-tenant': {
    statusCode: 400,
    detail: 'X-Tenant-Id is required',
  },
  'freight/invalid-location': {
    statusCode: 400,
    detail:
      'Location of the expedition (locationId) or origin ZipCode is required',
  },
  'freight/contract-not-found': {
    statusCode: 404,
    detail:
      'There are no carriers available for the Tenant, DeliveryMode and the requested Location of the expedition',
  },
  'freight/total-value-of-items-not-found': {
    statusCode: 404,
    detail:
      'There is no contract configured that the minValue and maxValue meet the total value of the items',
  },
  'freight/zipcode-not-found': {
    statusCode: 404,
    detail:
      'No freight was found that meets the destination ZipCode of request',
  },
  'freight/cubic-dimensions-not-found': {
    statusCode: 404,
    detail:
      'No freight was found that meets the Cubic Dimensions of request for the target ZipCode',
  },
  'freight/freight-not-found': {
    statusCode: 404,
    detail:
      'No freight was found that meets the destination ZipCode, Cubic Dimensions and Weight of request',
  },
  'freight/internal-error': {
    statusCode: 500,
    detail: 'An error occurred, please try again later',
  },
  'freight/id-must-be-a-string': {
    statusCode: 400,
    detail: 'carrier Id must be a string',
  },
  'freight/rule-type-must-be-a-string': {
    statusCode: 400,
    detail: 'rule type must be a string',
  },
  'freight/origin-zipcode-must-be-a-number-string': {
    statusCode: 400,
    detail: 'originZipCode must be a number string',
  },
  'freight/origin-zipcode-must-be-greater-than-7-characters': {
    statusCode: 400,
    detail: 'originZipCode must be greater than 7 characters',
  },
  'freight/origin-zipcode-must-be-shorter-than-12-characters': {
    statusCode: 400,
    detail: 'originZipCode must be shorter than 12 characters',
  },
  'freight/destination-zipcode-must-be-a-number-string': {
    statusCode: 400,
    detail: 'destinationZipCode must be a number string',
  },
  'freight/destination-zipcode-must-be-greater-than-7-characters': {
    statusCode: 400,
    detail: 'destinationZipCode must be greater than 7 characters',
  },
  'freight/destination-zipcode-must-be-shorter-than-12-characters': {
    statusCode: 400,
    detail: 'destinationZipCode must be shorter than 12 characters',
  },
  'freight/deliverymode-id-must-be-a-string': {
    statusCode: 400,
    detail: 'deliveryMode Id must be a string',
  },
  'freight/location-id-must-be-a-string': {
    statusCode: 400,
    detail: 'location Id must be a string',
  },
  'freight/carriers-must-be-an-array': {
    statusCode: 400,
    detail: 'carriers must be an array',
  },
  'freight/height-must-be-a-number': {
    statusCode: 400,
    detail: 'height must be a number',
  },
  'freight/width-must-be-a-number': {
    statusCode: 400,
    detail: 'width must be a number',
  },
  'freight/length-must-be-a-number': {
    statusCode: 400,
    detail: 'length must be a number',
  },
  'freight/weight-must-be-a-number': {
    statusCode: 400,
    detail: 'weight must be a number',
  },
  'freight/skuId-must-be-a-string': {
    statusCode: 400,
    detail: 'skuId must be a string',
  },
  'freight/modal-must-be-a-string': {
    statusCode: 400,
    detail: 'modal must be a string',
  },
  'freight/quantity-must-be-a-number': {
    statusCode: 400,
    detail: 'quantity must be a number',
  },
  'freight/unitary-value-must-be-a-number': {
    statusCode: 400,
    detail: 'unitaryValue must be a number',
  },
};

@Catch()
export class FreightExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const genericErrorCode = 'freight/internal-error';
    const genericError = errorsMap[genericErrorCode];

    const status =
      typeof exception.getStatus === 'function'
        ? exception.getStatus()
        : genericError.statusCode;

    let exceptionContent;
    if (typeof exception.getResponse === 'function') {
      exceptionContent = exception.getResponse() as any;
    } else if (errorsMap[exception.message]) {
      exceptionContent = {
        code: exception.message,
        ...errorsMap[exception.message],
      };
    }

    if (exceptionContent?.code && exceptionContent?.detail) {
      const { statusCode, ...error } = exceptionContent;
      return response.status(statusCode || status).send({
        errors: [error],
      });
    }
    if (
      exceptionContent?.message &&
      exceptionContent?.statusCode &&
      exceptionContent?.error === 'Bad Request'
    ) {
      const { statusCode, message } = exceptionContent;
      return response.status(statusCode || status).send({
        errors: message.length
          ? message.map((msg) => {
              const [source, code] = msg.split(' ');
              return {
                code,
                detail: errorsMap[code].detail,
                source: { pointer: source },
              };
            })
          : [
              {
                code: genericErrorCode,
                detail: genericError.detail,
              },
            ],
      });
    }

    return response.status(status).send({
      errors: [
        {
          code: genericErrorCode,
          detail: genericError.detail,
        },
      ],
    });
  }
}
