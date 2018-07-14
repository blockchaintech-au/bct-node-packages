const getConfigFromEnv = (key, defaultValue = '') => process.env[key] || defaultValue;

const JWT_SECRET = getConfigFromEnv('JWT_SECRET', 'secret');
const TOKEN_EXPIRATION_TIME = getConfigFromEnv('TOKEN_EXPIRATION_TIME', '1h');

export {
  JWT_SECRET,
  TOKEN_EXPIRATION_TIME,
};
