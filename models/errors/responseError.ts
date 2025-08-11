export class ResponseError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
