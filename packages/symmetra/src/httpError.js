class HttpError extends Error {
  constructor(error) {
    super(error.message);
    if (error.response) {
      this.status = error.response.status;
      this.data = error.response.data;
    } else {
      this.status = 500;
    }
  }
}

export default HttpError;
