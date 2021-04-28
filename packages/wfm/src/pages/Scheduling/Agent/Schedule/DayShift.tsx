import * as React from 'react';
import styled from 'styled-components';
import { DateTime, Duration } from 'luxon';
import { IEvent } from '@cx/types/time';
import { useQuery } from 'react-query';
import { getAgentSchedule } from '@cx/fakedata/agentSchedule';
import { groupBy } from '@cx/utilities';
import { LoadSpinner } from '@cx/components/LoadSpinner';

const Content = styled.div`
  padding: 15px;
`;
const EventsList = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 5px;
`;
const Summary = styled.div`
  display: contents;
`;
const LoadingMessage = styled.span`
  display: block;
  text-align: center;
  margin: 5px;

`;
const EventTitle = styled.h4`

`;

interface IEvent2 {
  event: IEvent;
  title: string;
}
export function DayShift({ event, title }: IEvent2) {
  const { agentId = '' } = event;
  const date = DateTime.fromJSDate(event.start);
  const fromDate = date.startOf('day').toISO();
  const toDate = date.endOf('day').toISO();

  const { data, isLoading } = useQuery(
    ['fetchAgentSchedule', fromDate, toDate],
    async () => getAgentSchedule(agentId, fromDate, toDate)
      .then((result: any) => result.data)
      .catch((err) => {
        console.error(err);
        throw err;
      }),
    {
      refetchInterval: 30000,
    },
  );

  const titleSummary = React.useMemo(() => {
    if (isLoading && !data) {
      return [];
    }

    const hoursWorked = data.filter((ev: IEvent) => ev.activityType === 'hours-worked');
    const otherHours = data.filter((ev: IEvent) => ev.activityType !== 'hours-worked');

    const titleEvents = groupBy(hoursWorked, 'title');
    const summaryHoursWorked = Object.keys(titleEvents).map((titleEv: string) => ({
      title: titleEv,
      start: new Date(Math.min(...titleEvents[titleEv].map((ev: IEvent) => new Date(ev.start)))),
      end: new Date(Math.max(...titleEvents[titleEv].map((ev: IEvent) => new Date(ev.end)))),
    }));

    return [...summaryHoursWorked, ...otherHours].sort(
      (a: IEvent, b: IEvent) => +new Date(a.start) - +new Date(b.start),
    );
  }, [data, isLoading]);

  const totalHoursDayShift = React.useMemo(() => {
    if (!titleSummary.length) {
      return null;
    }

    return {
      start: new Date(
        // @ts-ignore
        Math.min(...titleSummary.map((summary: any) => new Date(summary.start))),
      ),
      end: new Date(
        // @ts-ignore
        Math.max(...titleSummary.map((summary: any) => new Date(summary.end))),
      ),
    };
  }, [titleSummary]);

  const tHoursSummary = React.useMemo(() => {
    const thours = { hours: 0, minutes: 0 };

    if (isLoading && !data) {
      return thours;
    }

    return data.reduce((total: { hours: number; minutes: number }, current: IEvent) => {
      const start = DateTime.fromJSDate(new Date(current.start));
      const end = DateTime.fromJSDate(new Date(current.end));
      const diff = end.diff(start, ['hours', 'minutes']).toObject();

      // @ts-ignore
      total.hours += diff.hours;
      // @ts-ignore
      total.minutes += diff.minutes;
      return total;
    }, thours);
  }, [data, isLoading]);

  const totalDurationObject = Duration.fromObject(tHoursSummary)
    .normalize()
    .toObject();

  return (
    <Content>
      <EventTitle>
        {title}
        {' '}
        (
        {DateTime.fromJSDate(event.start).toLocaleString(DateTime.TIME_SIMPLE)}
        {' '}
        &#8213;
        {' '}
        {DateTime.fromJSDate(event.end).toLocaleString(DateTime.TIME_SIMPLE)}
        {' '}
        )
      </EventTitle>
      {' '}
      {!isLoading ? (
        <>
          <h3>
            {DateTime.fromJSDate(event.start).toLocaleString(DateTime.DATE_HUGE)}
            {', '}
            {!isLoading && totalHoursDayShift && (
              <>
                {DateTime.fromJSDate(totalHoursDayShift.start).toLocaleString(DateTime.TIME_SIMPLE)}
                {' '}
                &#8213;
                {' '}
                {DateTime.fromJSDate(totalHoursDayShift.end).toLocaleString(DateTime.TIME_SIMPLE)}
                {' '}
              </>
            )}
            {' '}
            {!isLoading
              && `(${totalDurationObject.hours ? `${totalDurationObject.hours}h` : ''}${
                totalDurationObject.minutes ? totalDurationObject.minutes : ''
              })`}
          </h3>
          {' '}
          <EventsList>
            {titleSummary.map((summary: any) => (
              <Summary key={`${title}-${summary.start.getTime()}`}>
                <div>
                  {DateTime.fromJSDate(summary.start).toLocaleString(DateTime.TIME_SIMPLE)}
                  {' '}
                  &#8213;
                  {' '}
                  {DateTime.fromJSDate(summary.end).toLocaleString(DateTime.TIME_SIMPLE)}
                  {' '}
                </div>
                <div>{summary.title}</div>
              </Summary>
            ))}
          </EventsList>
        </>
      ) : (
        <>
          <LoadingMessage>Loading...</LoadingMessage>
          {' '}
          <LoadSpinner spinnerType="simple" size={25} weight={4} secondary />
          {' '}
        </>
      )}
    </Content>
  );
}
