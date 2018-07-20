// TODO refactoring this file
const redundantHeaders = ['common', 'delete', 'get', 'head', 'post', 'put', 'patch'];

function removeParams(obj) {
  delete obj.params;
  delete obj.data;
  delete obj.headers;
  return obj;
}

function requestLogFormatter(req, logParams) {
  const {
    baseURL,
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
  const requestDetails = {
    baseURL,
    url,
    method,
    headers,
    params,
    data,
  };
  if (!logParams) removeParams(requestDetails);
  return { request: requestDetails };
}

function responseLogFormatter(res, logParams) {
  const {
    status,
    data,
  } = res;
  const responseDetails = { status, data };
  if (!logParams) removeParams(responseDetails);
  return { response: responseDetails };
}

function errorLogFormatter(error, logParams) {
  const { status, data } = error.response;
  const errorDetails = {
    message: error.message,
    status,
    data,
  };
  if (!logParams) removeParams(errorDetails);
  return { error: errorDetails };
}

export {
  requestLogFormatter,
  responseLogFormatter,
  errorLogFormatter,
};
