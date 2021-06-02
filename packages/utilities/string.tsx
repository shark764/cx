export const capitalize = (s: string): string => {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getUserDisplay = (data: any): string => {
  if (data === undefined) {
    return '';
  } else if (data.firstName || data.lastName) {
    return `${data.firstName || ''} ${data.lastName || ''}`.trim();
  } else {
    return data.email;
  }
};
