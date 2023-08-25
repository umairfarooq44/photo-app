import AppError from './appError';

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

export class BadRequest extends AppError {
  constructor(message: string) {
    super(message);
  }
}
