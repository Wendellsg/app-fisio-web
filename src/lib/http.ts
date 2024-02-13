export const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export type HttpStatus = (typeof HttpStatusCode)[keyof typeof HttpStatusCode];

export type HTTPResponse<T> = {
  status: HttpStatus;
  message: string;
  data?: T;
};
