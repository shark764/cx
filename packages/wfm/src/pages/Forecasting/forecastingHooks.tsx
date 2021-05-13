import { useMemo } from 'react';
import { DateTime } from 'luxon';

const chooseXaxisLabel = (timestamp: string, intervalLength: string) => {
  if (intervalLength === 'day' || intervalLength === 'twoDays') {
    return DateTime.fromISO(timestamp).toLocaleString({ hour: '2-digit' });
  } else {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATE_MED);
  }
};

export const useMemoLineChartData = (data: any, intervalLength: string, selectedCompetence: string, localAdjustments: any) => useMemo(() => {

  const competency = data?.find(({ competency }: any) => competency === selectedCompetence);

  return competency?.forecast.map(({ timestamp, nco, aht, abandons }: any, index: number) => ({
    timestamp: chooseXaxisLabel(timestamp, intervalLength),
    ogTimestamp: timestamp,
    nco: nco,
    adjustedNco: localAdjustments?.['adjustedNco']?.[timestamp] || competency?.adjusted[index].nco,
    aht: aht,
    adjustedAht: localAdjustments?.['adjustedAht']?.[timestamp] || competency?.adjusted[index].aht
  })
  ) || []

}, [data, intervalLength, selectedCompetence, localAdjustments]);

export const useMemoTableData = (data: any, intervalLength: string, selectedCompetence: string) => useMemo(() => {

  const competency = data?.find(({ competency }: any) => competency === selectedCompetence);

  return competency?.forecast.map(({ timestamp, nco, aht, abandons }: any, index: number) => ({
    timestamp: timestamp,
    nco: nco,
    adjustedNco: competency?.adjusted[index].nco + 2,
    aht: aht,
    adjustedAht: competency?.adjusted[index].aht + 2
  })
  ) || []

}, [data, selectedCompetence]);

export const useMemoTimelineAdjustments = (timelineAdjustments: any, selectedCompetence: string) => useMemo(() =>
  timelineAdjustments?.filter(({ competency }: any) => competency === selectedCompetence)
    .map(({ startDateTime, id, value }: any) => ({
      startDateTime: startDateTime,
      id: id,
      adjustment: value
    })) || [], [timelineAdjustments, selectedCompetence]);