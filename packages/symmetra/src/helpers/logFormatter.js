const redundantHeaders = ['common', 'delete', 'get', 'head', 'post', 'put', 'patch'];
function requestLogFormatter(req) {
  const {
    url,
    method,
    params,
    data,
  } = req;
  const headers = {};
  Object.keys(req.headers).forEach((key) => {
    if (!redundantHeaders.includes(key)) {
      headers[key] = req.headers[key];
    }
  });
  return {
    request: {
      url,
      method,
      headers,
      params,
      data,
    },
  };
}

function responseLogFormatter(res) {
  const { status, data } = res;
  return {
    response: {
      status,
      data,
    },
  };
}

function errorLogFormatter(error) {
  const { status, data } = error.response;
  return {
    error: {
      message: error.message,
      status,
      data,
    },
  };
}

export {
  requestLogFormatter,
  responseLogFormatter,
  errorLogFormatter,
};
