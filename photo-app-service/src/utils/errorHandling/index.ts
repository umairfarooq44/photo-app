import { BaseContext } from 'koa';
import _ = require('lodash');
import {
  BadRequest,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError
} from './httpErrors';
import * as yup from 'yup';
import axios from 'axios';

export default () => async (ctx: BaseContext, next: () => void) => {
  try {
    await next();
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      // axios error
      const error = {
        ..._.pick(err.response, ['status', 'statusText', 'data']),
        responseHeaders: err.response.headers
      };

      ctx.status = err.response.status;
      ctx.body = err.response.data;

      if (err.response.status >= 500) {
        ctx.log.error({ err: error });
      } else {
        ctx.log.warn({ err: error });
      }
    } else if (err instanceof UnauthorizedError) {
      ctx.log.warn({ err });
      ctx.throw(401, err.message ? err.message : 'Unauthorized');
    } else if (err instanceof ForbiddenError) {
      ctx.log.warn({ err });
      ctx.throw(403, err.message ? err.message : 'Forbidden');
    } else if (err instanceof NotFoundError) {
      ctx.log.warn({ err });
      ctx.throw(404, err.message ? err.message : 'Not found');
    } else if (err instanceof BadRequest) {
      ctx.log.warn({ err });
      ctx.throw(400, err.message ? err.message : 'Bad Request');
    } else if (err instanceof yup.ValidationError) {
      ctx.status = 400;

      ctx.body = {
        errors: err.errors
      };

      ctx.log.warn({ err });
    } else {
      const error: any = err;
      // general error (ie undefined is not a function)
      ctx.status = 500;
      ctx.body = { error: error.message };
      ctx.log.error({
        err
      });
    }
  }
};
