import _camelCase from 'lodash/camelCase';
import _snakeCase from 'lodash/snakeCase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const camelCaseKeys = (obj: Record<string, any>): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelCaseKeys(v));
  }
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [_camelCase(key)]: camelCaseKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const snakeCaseKeys = (obj: Record<string, any>): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => snakeCaseKeys(v));
  }
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [_snakeCase(key)]: snakeCaseKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};
