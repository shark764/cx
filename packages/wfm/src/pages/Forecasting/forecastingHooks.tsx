import { useMemo } from 'react';
import { DateTime } from 'luxon';

type IntervalLength = 'day' | 'twoDays' | 'week';

const chooseXaxisLabel = (timestamp: string, intervalLength: IntervalLength) => {
  if (intervalLength === 'day' || intervalLength === 'twoDays' ) {
    return DateTime.fromISO(timestamp).toLocaleString({ hour: '2-digit' });
  } else {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATE_MED);
  }
};

export const useMemoLineChartData = (data: any, intervalLength: IntervalLength, selectedCompetence: string) => useMemo(() =>
  data
  ?.data
  ?.find(({competency}: any) => competency === selectedCompetence)
  ?.data
  ?.[0]
  ?.series.map(({ timestamp, nco, aht, abandons }: any) => ({
    timestamp: chooseXaxisLabel(timestamp, intervalLength),
    nco: nco,
    aht: aht,
  })) || [], [data, intervalLength, selectedCompetence]
);