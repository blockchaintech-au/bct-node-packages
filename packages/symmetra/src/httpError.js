class HttpError extends Error {
  constructor(error) {
    super(error.message);
    this.status = error.response ? error.response.status : 500;
  }
}

export default HttpError;
