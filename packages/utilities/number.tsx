export const round = (number: number, digits = 0) => {
  if (digits === 0) {
    return Math.round(number);
  }
  const d = 10 ** digits;
  return Math.round(number * d) / d;
};
