class MaskHelper {
  constructor (filter){
    this.filter = filter;
  }

  mask(object){
    this.maskObj(object);
  }

  maskObj(obj) {
    if(Array.isArray(obj)){
      obj.forEach( item => {
        if(this.isArrayOrObject(item)) {
          this.maskObj(item);
        }
        return;
      });
    } else if( typeof obj === 'object' ){
      Object.keys(obj).forEach(key => {
        const value = obj[key]
        if(this.isArrayOrObject(value)) {
          this.maskObj(value);
        } else {
          obj[key] = this.maskItem(key, value);
        }
      });
    }
  }

  maskItem(key, value) {
    if (this.filter.hasOwnProperty(key)) {
      return String(value).replace(this.filter[key], x => {
        return '*'.repeat(x.length);
      })
    }
    return value;
  }

  isArrayOrObject(obj){
    return Array.isArray(obj) || (typeof obj === 'object');
  }
}


export default MaskHelper;
