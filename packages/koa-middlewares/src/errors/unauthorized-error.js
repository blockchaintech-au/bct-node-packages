class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
    this.status = 401;
  }
}

export default UnauthorizedError;
