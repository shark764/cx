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

export const useMemoLineChartData = (data: any, intervalLength: string, selectedCompetence: string) => useMemo(() => {

  const dataPointsTotal = data.find( ({forecast}: any) => forecast.length > 0 )?.forecast?.length;
  const fillerArray = new Array(dataPointsTotal).fill({});

  const chartData = data.reduce((lineChartData: any, { channel, competency, forecast, adjusted, direction, staffing }: any, index: number) => {

    const channelKey = channel.charAt(0).toUpperCase() + channel.slice(1);

      return {
        ...lineChartData,
        [competency]:
        fillerArray.map((_: any, index: number) => {
          const { timestamp, nco, aht  } = forecast[index] ?? {};
          const { nco: adjustedNco, aht: adjustedAht } = adjusted[index] ?? {};
          const { staffing_estimate } = staffing[index] ?? {};
          return {
            timestamp: chooseXaxisLabel(timestamp, intervalLength),
            ogTimestamp: timestamp,
            ...lineChartData?.[competency]?.[index],
            [ `nco${channelKey}` ]: nco,
            [ `adjustedNco${channelKey}` ]: adjustedNco,
            [ `aht${channelKey}` ]: aht,
            [ `adjustedAht${channelKey}` ]: adjustedAht,
            [ `staffingEstimate${channelKey}` ]: staffing_estimate,
          };

        }),
      };

  }, {});

  return chartData?.[selectedCompetence] || [];

}, [data, intervalLength, selectedCompetence]);

export const useMemoTableData = (
  data: any,
  viewBy: IntervalLength,
  selectedCompetence: string,
  timelineAdjustments: any,
  tenant_id: string,
  selectedTimeline: string,
  setLatestAdjustmentId: any,
) => useMemo(() => {

  const competency = pluckCompetence(data, selectedCompetence);

  return competency?.forecast.map(({ timestamp, nco, aht, abandons }: any, index: number) => ({
    timestamp: timestamp,
    nco: nco,
    adjustedNco: competency?.adjusted[index].nco - nco,
    speculatedNco: competency?.adjusted[index].nco,
    ncoDerivedAdjustments: timelineAdjustments
      .filter((adjustment: any) => (
        adjustment.metric === 'nco' &&
        adjustment.startDateTime === timestamp &&
        adjustment.competency === selectedCompetence &&
        adjustment.numberOfIntervals === 1
      )),
    aht: aht,
    adjustedAht: competency?.adjusted[index].aht - aht,
    speculatedAht: competency?.adjusted[index].aht,
    ahtDerivedAdjustments: timelineAdjustments
      .filter((adjustment: any) => (
        adjustment.metric === 'aht' &&
        adjustment.startDateTime === timestamp &&
        adjustment.competency === selectedCompetence &&
        adjustment.numberOfIntervals === 1
      )),
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
      refresh: (id: string) => {
        setLatestAdjustmentId(id)
      }
    }
  })
  ) || []

}, [data, viewBy, selectedCompetence, timelineAdjustments, tenant_id, selectedTimeline, setLatestAdjustmentId]);

export const useMemoTimelineAdjustments = (timelineAdjustments: any, selectedCompetence: string) => useMemo(() =>
  timelineAdjustments?.filter(({ competency }: any) => competency === selectedCompetence)
    .map(({ startDateTime, id, value }: any) => ({
      startDateTime: startDateTime,
      id: id,
      adjustment: value
    })) || [], [timelineAdjustments, selectedCompetence]);
