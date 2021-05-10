import * as React from 'react';
import { useState, useMemo } from 'react';
import { randomUniform } from 'd3';
import { useQuery } from 'react-query';
import { wfm } from '../../api';
// @ts-ignore
import { DateTime } from 'luxon';

const stagePool1Competencies = {
  "Voice": "d54d8a00-34d0-11e7-b248-062913f854c1",
  // "Email": "67b17db0-7dd9-11e7-9441-d379301ec11d",
  // "Sms": "65d62e00-7dd9-11e7-9441-d379301ec11d",
  // "Messaging": "68c00780-7dd9-11e7-9441-d379301ec11d",
};

const rand = (a:number,b:number) => Math.trunc(randomUniform(a, b)());

const randomNco = (day: DateTime, index: any) => {
  const { hour } = day;
  if (hour >= 7 && hour <= 9 ) {
    return rand(4, 14);
  } else if (hour > 9 && hour <= 11 ) {
    return rand(14, 24);
  } else if (hour > 11 && hour <= 13 ) {
    return rand(24, 30);
  } else if (hour > 13 && hour <= 15 ) {
    return rand(14, 24);
  } else if (hour > 15 && hour <= 16 ) {
    return rand(4, 14);
  } else {
    return rand(1, 3);
  }
};

const typicalDay = (day: any) => new Array(96).fill(day).map((day, index) => {
  const interval = day.plus({minutes: 15 * index});
  if (!interval.isValid) { return {} }
  return {
    timestamp: interval.toISO().replace('0-04:00', 'Z').replace('0-03:00', 'Z'), // replace is due to current users timezone and DST for past dates
    nco: randomNco(interval, index),
    aht: rand(3, 7),
    abandons: rand(0, 1),
  }
} );

export const Dev = () => {
  // Add historical data for last years may 1st plus 31 days   2020-05-20T00:00:00Z'
  // 1140 min in a day, 96 15 min intervals in a day
  // 900 seconds is 15 min
  /**
   * Starting with a day in the past, fill in some historical data for 31 days
   * Then go create a forecast for that data
   */
  const [startDate, setStartDate] = useState('2020-05-01');

  const seriesDataToAdd = useMemo(() => {
    const start = DateTime.fromISO(startDate);
    const thing =  new Array(31).fill(start).flatMap((start, index) => typicalDay(start.plus({days: index}) ));
    // @ts-ignore   get an idea of how many interactions per day
    console.log(thing.reduce((total, {nco}) => total += nco, 0) / 31 );
    return thing;
  }
  , [startDate])

  const {
    // data,
    // isLoading,
    // error,
    refetch: generateData
  } = useQuery<any, any>(
    ['historicalData'],
    () => wfm.forecasting.api.post_tenants_tenant_id_competencies_competency_id_historical({
      pathParams: { tenant_id: 'd44f4620-34cb-11e7-b248-062913f854c1', competency_id: stagePool1Competencies['Voice'] },
      body: {
        channel: "voice",
        direction: "inbound",
        series: seriesDataToAdd
      }
    }),
    {
      refetchOnWindowFocus: false,
      enabled: false
    }
  );

  return (
    <>
      <h3>🎉 You've reached the secret bonus menu of WFM 🎉</h3>

      <div>Add some randomized historical data starting on a date in the past spanning over 31 days</div>
      <input placeholder="Start Date" value={startDate} onChange={({target: { value }}) => setStartDate(value)} />
      <br />
      <br />
      <button onClick={() => generateData()} >Submit</button>
    </>
  )
};
