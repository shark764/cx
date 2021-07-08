import { DateTime, Duration } from 'luxon';
import { StatisticFormat } from '@cx/types';

export interface FormatMap {
  [key: string]: (input: number, type: string) => number | string;
}

export const statisticFormatMap: FormatMap = {
  count: (input: number | string) => input,
  percent: (input: number | string) => `${input}%`,
  time: (input: number, type: string) => {
    const duration = Duration.fromMillis(input);
    if (input > 60000 || type === 'table') {
      return duration.toFormat('hh:mm:ss');
    }
    const durationObject = duration
      .shiftTo('hours', 'minutes', 'seconds', 'milliseconds')
      .normalize()
      .toObject();
    return `${durationObject.seconds}s`;
  },
  timestamp: (input: number | string) => DateTime.fromISO(input as string).toLocaleString(
    DateTime.DATETIME_MED_WITH_SECONDS,
  ),
  ratio: (input: number | string) => `${input}%`,
  json: () => '--',
};

export const getStatisticFormat = (
  input: number,
  format: StatisticFormat,
  type: string,
): string | number => statisticFormatMap[format](input, type);
