export function log(type: string, msg: string, ...args: any[]) {
  switch (type) {
    case 'info':
      console.log(`%c${msg}`, 'color: #00529B; background-color: #BDE5F8;', ...args);
      break;
    case 'success':
      console.log(`%c${msg}`, 'color: #4F8A10; background-color: #DFF2BF;', ...args);
      break;
    case 'warning':
      console.log(`%c${msg}`, 'color: #9F6000; background-color: #FEEFB3;', ...args);
      break;
    case 'error':
      console.log(`%c${msg}`, 'color: #D8000C; background-color: #FFD2D2;', ...args);
      break;
    default:
      console.log(`%c${msg}`, 'background: LightGoldenRodYellow; color: darkslategray;', ...args);
      break;
  }
}

export const hexToRgba = (hex: any, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x: string) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

/**
 * Merge objects deeply
 * https://stackoverflow.com/a/48218209
 */
export const deepMerge = (target: any, source: any) => {
  const isObject = (obj: any) => obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge({ ...targetValue }, sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
};

export function groupBy(array: any, key: string) {
  return array.reduce((groups: any, item: any) => {
    const property = item[key];
    groups[property] = groups[property] || [];
    groups[property].push(item);
    return groups;
  }, {});
}
