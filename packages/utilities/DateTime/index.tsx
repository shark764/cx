import { DateTime } from 'luxon';
export const translateHourValue = (hour: number, standardTime: boolean): [number, string] => {
  const translatedOverage = hour > 24 ? hour % 24 : hour;
  if (standardTime) {
    return [translatedOverage, translatedHour(translatedOverage)];
  }
  return [translatedOverage, `${translatedOverage}`];
};

export const standardHour = (hour: number, suffix: string, smallerSizedComponent?: boolean): string => `${hour % 12 || 12} ${smallerSizedComponent ? '' : suffix}`;

export const translatedHour = (hour: number): string => (hour < 12 || hour === 24 ? standardHour(hour, 'am') : standardHour(hour, 'pm'));

export const formatJSDate = (date: Date): string => DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');

export const wfmDate = (date: DateTime): string => date.toFormat('yyyy-LL-dd');

export const pastTwoYears = (): {startDate: string, endDate: string} => {
  const yesterday = DateTime.now().minus({days: 1});
  const startDate = yesterday.minus({years: 2});
  return {startDate: wfmDate(startDate), endDate: wfmDate(yesterday)};
};