type TransformFunction = (_key: string) => string;

const transformKeys = <T>(obj: Record<string, T>, keyTransform: TransformFunction): Record<string, T> => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    return obj.map((item) => transformKeys(item, keyTransform)) as any;
  }

  const transformedObj: Record<string, T> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const transformedKey = keyTransform(key);
      transformedObj[transformedKey] = obj[key];
    }
  }

  return transformedObj;
};

export const camelCaseKeys = <T>(obj: Record<string, T>): Record<string, T> =>
  transformKeys(obj, (key) => key.replace(/_([a-z])/g, (_, group: string) => group.toUpperCase()));

export const snakeCaseKeys = <T>(obj: Record<string, T>): Record<string, T> =>
  transformKeys(obj, (key) => key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`));
