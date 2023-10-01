export const camelCaseKeys = (obj: Record<string, any>): Record<string, any> => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => camelCaseKeys(item));
  }

  const camelCaseObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, group) => group.toUpperCase());
      camelCaseObj[camelCaseKey] = camelCaseKeys(obj[key]);
    }
  }

  return camelCaseObj;
};

export const snakeCaseKeys = (obj: Record<string, any>): Record<string, any> => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => snakeCaseKeys(item));
  }

  const snakeCaseObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeCaseKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
      snakeCaseObj[snakeCaseKey] = snakeCaseKeys(obj[key]);
    }
  }

  return snakeCaseObj;
};
