/// Helpers should only contain functions that is not tightly coupled to the Project.
/// Functions that requires external libraries should also be placed here as far as
/// the external library doesn't depend on NextJs or development environment

/**
 * A helper function to combine multiple classes
 * @param classNames classes to be combined
 * @returns joined classes
 */
export const classes = (...classNames: Array<string | undefined>) => classNames.join(' ');

/**
 * Check if object is empty or not
 * @param obj Object
 * @returns true if object is empty
 */
export const isEmptyObject = (obj: {[key: string]: unknown}) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Remove fields with empty values from an object
 * @param object Object
 * @returns Object without null
 */
export const removeNull = <T>(object: T) => {
    const newObject = {...object};
    for (const key in newObject) {
      if (Object.prototype.hasOwnProperty.call(newObject, key)) {
        const element = newObject[key];
        if (!element) {
          delete newObject[key];
        }
      }
    }
    return newObject;
};

/**
 * Build a url by replacing path params with their value from object provided and the rest has query params\n
 * for example, it takes a url ``https://example.com/:id`` with a give object ```{id: '1234', search: 'Yes'}```
 * and return ``https://example.com/1234?search=Yes``
 * @param url url to build
 * @param json object query params and path params
 * @returns 
 */
export const makeUrl = (url: string, json?: {[key: string]: any}) => {
    if (!json) {
      return url;
    }
  
    if (isEmptyObject(json)) {
      return url;
    }
  
    for (const key in removeNull(json)) {
      url = url.replace(`:${key}`, encodeURIComponent(json[key]));
      if(url.includes(`:${key}`)) {
        delete json[key];
      }
    }
    let params = ''
    if(Object.keys(json).length) {
      params = new URLSearchParams(json).toString();
    }

    return `${url}${params ? '?'+params : ''}`;
};

/**
 * Debounce delays function calls and override the previous function if the function was called again before time elapse
 * @param func function to call
 * @param timeout delay in milliseconds before function is called
 * @returns function
 */
export const debounce = (func: Function, timeout: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (value: any) => {
    if(timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(value);
    }, timeout);
  };
}