import axios from 'axios';



const defaultRequestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  };
  
  const NotFound = message => {
    const error = new Error(message);
    error.code = 'NotFound';
    return error;
  };
  
  const formatResponse = ({ response }) => {
    console.log(response);
    const res = pickAll(['status', 'headers', 'data'], response);
    const requestUrl = path(['config', 'url'], response);
    return { requestUrl, ...res };
  };
  
  axios.interceptors.request.use(request => {
    logger.info('BFF sent Request:', request);
    return request;
  });
  
  axios.interceptors.response.use(response => {
    logger.info('BFF got Response:', formatResponse({ response }));
    return response;
  }, error => {
    logger.error('BFF got Error:', formatResponse(error));
    return Promise.reject(error);
  });

axios.get('http://localhost:8080').then(res => console.log(res)).catch(error => console.log(error));