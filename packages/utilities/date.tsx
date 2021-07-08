import { DateTime } from 'luxon';

export const addDays = (date: Date | null, days: number): Date => {
  const res = new Date(Number(date));
  res.setDate(res.getDate() + days);
  return res;
};

export const removeDays = (date: Date | null, days: number): Date => {
  const res = new Date(Number(date));
  res.setDate(res.getDate() - days);
  return res;
};

export const parseDateToISODate = (date: Date, startEndOfDay?: 'startOfDay' | 'endOfDay'): string => {
  return startEndOfDay === 'startOfDay' ?
    DateTime.fromJSDate(date).toUTC().startOf('day').toISO() :
    DateTime.fromJSDate(date).toUTC().endOf('day').toISO();
}

export const convertJSDateToUTC = (date: Date): Date => {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}

export const getMonday = (d: Date): Date => {
  const d2 = new Date(d);
  const day = d2.getDay();
  const diff = d2.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d2.setDate(diff));
};

export const isSameDay = (date1: Date, date2: Date): boolean => date1.getDate() === date2.getDate()
  && date1.getMonth() === date2.getMonth()
  && date1.getFullYear() === date2.getFullYear();

export const disableDays = (date: Date, daysToDisable?: string): boolean => {
  const day = date.getDay();
  if (daysToDisable === 'disableWeekends') {
    return day !== 0 && day !== 6;
  }
  if (daysToDisable === 'onlyEnableMonday') {
    return day === 1;
  }
  return true;
};

export const getDiffInDaysFn = (startDateTime: string, endDateTime: string): any => {
  const start = DateTime.fromISO(startDateTime);
  const end = DateTime.fromISO(endDateTime);
  const diffInDays = end.diff(start, 'days').toObject();
  const { days } = diffInDays;
  return days;
}

const weekDiff = (date1: DateTime, date2: DateTime) => {
  const diffInWeeks = date2.diff(date1, 'weeks').toObject();
  const { weeks } = diffInWeeks;
  return weeks;
};

export const getDiffInWeeks = (start: DateTime, end: DateTime): number | undefined => {
  const convertedStart = start.toUTC().startOf('day');
  const convertedEnd = end.toUTC().startOf('day');
  if ( convertedStart > convertedEnd ) {
    return weekDiff(convertedStart.plus({days: 1}), convertedEnd);
  } else {
    return weekDiff(convertedStart, convertedEnd.plus({days: 1}));
  }
}

export const selectedRangeFn = ( startDateTime: string, endDateTime: string): string => {
  const diffDays = getDiffInDaysFn(startDateTime, endDateTime);
  const rangeMap:{[key: number]: string} = {
    0: 'day',
    1: 'twoDays',
    6: 'week',
  };
  return rangeMap[diffDays] || 'range';
}

export const changeRangeFn = (startDateTime: string, endDateTime: string, rangeId: string, dateType?: string): string => {

  const start = DateTime.fromISO(startDateTime).toJSDate();
  const end = DateTime.fromISO(endDateTime).toJSDate();
  const diffDays = getDiffInDaysFn(startDateTime, endDateTime);
  const changeKey = dateType ? rangeId : `${selectedRangeFn(startDateTime, endDateTime)}-${rangeId}`;
  const descisionMatrix: {[key: string]: any} = {
    'day': () => [addDays(start, 0), addDays(start, 0)],
    'twoDays': () => [addDays(start, 0), addDays(start, 1)],
    'week': () => [addDays(start, 0), addDays(start, 6)],
    'range': () => [addDays(start, 0), addDays(start, diffDays)],

    'day-day': () => [null, addDays(end, 0)],
    'day-twoDays': () => [null, addDays(end, 1)],
    'day-week': () => [null, addDays(end, 6)],
    'day-range': () => [null, addDays(end, 14)],

    'twoDays-day': () => [null, addDays(start, 0)],
    'twoDays-twoDays': () => [null, addDays(start, 1)],
    'twoDays-week': () => [null, addDays(end, 5)],
    'twoDays-range': () => [null, addDays(end, 13)],

    'week-day': () => [null, addDays(start, 0)],
    'week-twoDays': () => [null, addDays(start, 1)],
    'week-week': () => [null, addDays(start, 6)],
    'week-range': () => [null, addDays(end, 8)],

    'range-day': () => [null, addDays(start, 0)],
    'range-twoDays': () => [null, addDays(start, 1)],
    'range-week': () => [null, addDays(start, 6)],
    'range-range': () => [null, addDays(start, diffDays)]
  };

  return descisionMatrix[changeKey]();
}