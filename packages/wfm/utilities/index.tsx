export function log(type: string, msg: string, ...args: any[]) {
  switch (type) {
    case 'info':
      console.log(
        `%c${msg}`,
        'color: #00529B; background-color: #BDE5F8;',
        ...args
      );
      break;
    case 'success':
      console.log(
        `%c${msg}`,
        'color: #4F8A10; background-color: #DFF2BF;',
        ...args
      );
      break;
    case 'warning':
      console.log(
        `%c${msg}`,
        'color: #9F6000; background-color: #FEEFB3;',
        ...args
      );
      break;
    case 'error':
      console.log(
        `%c${msg}`,
        'color: #D8000C; background-color: #FFD2D2;',
        ...args
      );
      break;
    default:
      console.log(
        `%c${msg}`,
        'background: LightGoldenRodYellow; color: darkslategray;',
        ...args
      );
      break;
  }
}

export const theme = {
  colors: {
    brand: '#07487a',
    primary: '#07487a',
    secondary: '#a3acbd',
    'accent-1': '#3498db',
    'accent-2': '#e6f5ff',
    'accent-3': '#ffffff',
    text: '#222222',
    info: '#00529b',
    success: '#4f8a10',
    warning: '#9f6000',
    error: '#d8000c',
  },
};

export const hexToRgba = (hex: any, alpha: number = 1) => {
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
