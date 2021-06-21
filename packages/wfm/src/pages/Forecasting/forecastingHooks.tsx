import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { deleteAdjustment } from './deleteAdjustment';
import { updateAdjustment } from './updateAdjustment';
import { createAdjustment } from './createAdjustment';
import { components } from '@cx/cxapi/forecast-schema';
type IntervalLength = components["schemas"]["IntervalType"];

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



export const useMemoTableData = (
  data: any,
  viewBy: IntervalLength,
  selectedCompetence: string,
  localAdjustments: any,
  globalInitialAdjustments: any,
  tenant_id: string,
  selectedTimeline: string,
  refetchTimeline: any,
  refetchAdjustments: any,
  ) => useMemo(() => {

  const competency = pluckCompetence(data, selectedCompetence);

  return competency?.forecast.map(({ timestamp, nco, aht, abandons }: any, index: number) => ({
    timestamp: timestamp,
    nco: nco,
    adjustedNco: competency?.adjusted[index].nco - nco,
    speculatedNco: competency?.adjusted[index].nco,
    ncoDerivedAdjustments: globalInitialAdjustments
      .filter((adjustment: any) => (
        adjustment.metric === 'nco' &&
        adjustment.startDateTime === timestamp &&
        adjustment.competency === selectedCompetence
      )),
    ncoLocalAdjustement: localAdjustments['adjustedNco']?.[timestamp],
    aht: aht,
    adjustedAht: competency?.adjusted[index].aht - aht,
    speculatedAht: competency?.adjusted[index].aht,
    ahtDerivedAdjustments: globalInitialAdjustments
    .filter((adjustment: any) => (
      adjustment.metric === 'aht' &&
      adjustment.startDateTime === timestamp &&
      adjustment.competency === selectedCompetence
    )),
    ahtLocalAdjustment: localAdjustments['adjustedAht']?.[timestamp],
    crud: {
      create: createAdjustment(
        tenant_id,
        selectedTimeline,
        viewBy,
        selectedCompetence,
      ),
      delete: deleteAdjustment(
        tenant_id,
        selectedTimeline,
      ),
      update: updateAdjustment(
        tenant_id,
        selectedTimeline,
        viewBy,
        selectedCompetence,
      ),
      refresh: () => {
          refetchTimeline();
      }
    }
  })
  ) || []

}, [data, selectedCompetence, localAdjustments, globalInitialAdjustments, viewBy, tenant_id, selectedTimeline,refetchTimeline]);



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