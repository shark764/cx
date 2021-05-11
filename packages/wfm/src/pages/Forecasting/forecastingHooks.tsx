import { useMemo } from 'react';
import { DateTime } from 'luxon';

const chooseXaxisLabel = (timestamp: string, intervalLength: string) => {
  if (intervalLength === 'day' || intervalLength === 'twoDays') {
    return DateTime.fromISO(timestamp).toLocaleString({ hour: '2-digit' });
  } else {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATE_MED);
  }
};

export const useMemoLineChartData = (data: any, intervalLength: string, selectedCompetence: string) => useMemo(() =>
  data?.find(({ competency }: any) => competency === selectedCompetence)
    ?.forecast
    .map(({ timestamp, nco, aht, abandons }: any) => ({
      timestamp: chooseXaxisLabel(timestamp, intervalLength),
      nco: nco,
      aht: aht,
    })) || [], [data, intervalLength, selectedCompetence]
);

export const useMemoTableData = (data: any, intervalLength: string, selectedCompetence: string) => useMemo(() => {

  const competency = data?.find(({ competency }: any) => competency === selectedCompetence);

  return competency?.forecast.map(({ timestamp, nco, aht, abandons }: any, index: number) => ({
    timestamp: timestamp,
    nco: nco,
    adjustedNco: competency?.adjusted[index].nco,
    aht: aht,
    adjustedAht: competency?.adjusted[index].aht
  })
  ) || []

}, [data, intervalLength, selectedCompetence]);

export const useMemoTimelineAdjustments = (timelineAdjustments: any, selectedCompetence: string) => useMemo(() =>
  timelineAdjustments?.filter(({ competency }: any) => competency === selectedCompetence)
    .map(({ startDateTime, id, value }: any) => ({
      startDateTime: startDateTime,
      id: id,
      adjustment: value
    })) || [], [timelineAdjustments, selectedCompetence]);