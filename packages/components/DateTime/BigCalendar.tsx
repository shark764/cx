import * as React from 'react';
import { Calendar } from 'react-big-calendar';
import { DateTime } from 'luxon';
import { LuxonLocalizer } from '@cx/utilities/intl/LuxonLocalizer';

import styled, { css } from 'styled-components';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { deepMerge } from '@cx/utilities';
import { IContainer } from '@cx/types';
import { IBigCalendar } from '@cx/types/time';

const CalendarContainer = styled.div<IContainer>`
  margin: 0 auto;
  padding: 10px;
  height: ${({ height }) => height || '500px'};
  ${({ width }) => width
    && css`
      width: ${width};
    `};

  .rbc-day-slot .rbc-events-container {
    width: 100%;
  }

  .rbc-timeslot-group {
    min-height: 22px;
    line-height: 21px;
  }

  .rbc-time-view .rbc-row.rbc-time-header-cell {
    min-height: 40px;
  }

  .rbc-time-content {
    overflow-y: visible;
  }

  .rbc-today {

  }
  .rbc-event {

  }
`;

const WeekHeader = styled.div`
  span {
    display: block;
  }
`;

const luxonLocalizer = LuxonLocalizer(DateTime, { firstDayOfWeek: 1 });

export interface CalendarWeekHeader {
  date: Date;
  localizer: {
    format: (date: Date, format: string) => React.ReactNode;
  };
}

export const calendarWeekHeader: React.VFC<CalendarWeekHeader> = ({ date, localizer }) => (
  <WeekHeader>
    <span>{localizer.format(date, 'cccc')}</span>
    <span>{localizer.format(date, 'dd-MMM')}</span>
  </WeekHeader>
);

export const BigCalendar: React.VFC<IBigCalendar> = ({
  height,
  width,
  className,
  view,
  onView,
  components = {},
  formats = {},
  ...rest
}) => {

  const calendarComponents = deepMerge(
    {
      week: {
        header: calendarWeekHeader,
      },
    },
    components,
  );

  const calendarFormats = deepMerge(
    {
      weekdayFormat: 'cccc',
      dayFormat: 'cccc',
    },
    formats,
  );

  return (
    <CalendarContainer className={className} height={height} width={width}>
      <Calendar
        localizer={luxonLocalizer}
        formats={calendarFormats}
        components={calendarComponents}
        view={view}
        onView={onView}
        {...rest}
      />
    </CalendarContainer>
  );
};
