import { useMemo } from 'react';
import { DateTime } from 'luxon';

const chooseXaxisLabel = (timestamp: string, intervalLength: string) => {
  if (intervalLength === 'day' || intervalLength === 'twoDays') {
    return DateTime.fromISO(timestamp).toLocaleString({ hour: '2-digit' });
  } else {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATE_MED);
  }
};

const pluckCompetence = (data: any, competencId: string) => data?.find(({ competency }: any) => competency === competencId)

export const useMemoLineChartData = (data: any, intervalLength: string, selectedCompetence: string, localAdjustments: any, globalInitialAdjustments: any) => useMemo(() => {

  const competency = pluckCompetence(data, selectedCompetence);

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



export const useMemoTableData = (data: any, intervalLength: string, selectedCompetence: string, localAdjustments: any, globalInitialAdjustments: any) => useMemo(() => {

  const competency = pluckCompetence(data, selectedCompetence);

  return competency?.forecast.map(({ timestamp, nco, aht, abandons }: any, index: number) => ({
    timestamp: timestamp,
    nco: nco,
    adjustedNco: competency?.adjusted[index].nco + 2,
    ncoDerivedAdjustements: globalInitialAdjustments.filter((adjustemnt: any) => adjustemnt.metric === 'nco')
      .filter((adjustment: any) => (
        adjustment.startDateTime === timestamp &&
        adjustment.competency === selectedCompetence
        // TODO: nopes...   it's missing the type of adjustment in the adjustments response?
      )),
    ncoLocalAdjustement: localAdjustments['adjustedNco']?.[timestamp],
    aht: aht,
    adjustedAht: competency?.adjusted[index].aht + 2,
    ahtDerivedAdjustements: globalInitialAdjustments.filter((adjustemnt: any) => adjustemnt.metric === 'aht')
    .filter((adjustment: any) => (
      adjustment.startDateTime === timestamp &&
      adjustment.competency === selectedCompetence
      // TODO: nopes...   it's missing the type of adjustment in the adjustments response?
    )),
    ahtLocalAdjustment: localAdjustments['adjustedAht']?.[timestamp],
  })
  ) || []

}, [data, selectedCompetence, localAdjustments, globalInitialAdjustments]);



export const useMemoTimelineAdjustments = (timelineAdjustments: any, selectedCompetence: string) => useMemo(() =>
  timelineAdjustments?.filter(({ competency }: any) => competency === selectedCompetence)
    .map(({ startDateTime, id, value }: any) => ({
      startDateTime: startDateTime,
      id: id,
      adjustment: value
    })) || [], [timelineAdjustments, selectedCompetence]);


export const useMemoStaffingData = (data: any, intervalLength: string, selectedCompetence: string) => useMemo(() => {

  const competency = pluckCompetence(data, selectedCompetence);

  return competency?.staffing.map(({ timestamp, staffing_estimate }: any) => ({
    timestamp: chooseXaxisLabel(timestamp, intervalLength),
    staffing_estimate,
  })
  ) || []

  }, [data, intervalLength, selectedCompetence]);