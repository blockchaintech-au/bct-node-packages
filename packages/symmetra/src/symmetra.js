
import axios from 'axios';
import applyInteceptor from './interceptor';
import { defaultConfig, mergeConfig } from './helpers/configHelper';

function createInstance(customConfig) {
  const instance = axios.create(mergeConfig(defaultConfig, customConfig));
  applyInteceptor(instance);
  return instance;
}

const symmetra = createInstance();
symmetra.create = createInstance;

export default symmetra;
