function isArrayOrObject(obj) {
  return Array.isArray(obj) || (typeof obj === 'object');
}

class MaskHelper {
  constructor(filter) {
    this.filter = filter;
  }

  mask(object) {
    const cloneObj = JSON.parse(JSON.stringify(object));
    this.maskObj(cloneObj);
    return cloneObj;
  }

  maskObj(obj) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        if (isArrayOrObject(item)) {
          this.maskObj(item);
        }
      });
    } else if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (isArrayOrObject(value)) {
          this.maskObj(value);
        } else {
          obj[key] = this.maskItem(key, value); // eslint-disable-line
        }
      });
    }
  }

  maskItem(key, value) {
    if (Object.prototype.hasOwnProperty.call(this.filter, key)) {
      return String(value).replace(this.filter[key], x => '*'.repeat(x.length));
    }
    return value;
  }
}

export default MaskHelper;
