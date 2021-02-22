import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Calendar } from 'react-big-calendar';
import { DateTime } from 'luxon';
import styled, { css } from 'styled-components';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { deepMerge } from '@cx/utilities';
import { LuxonLocalizer } from '@cx/utilities/intl/LuxonLocalizer';
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

  .rbc-time-view .rbc-row.rbc-time-header-cell {
    min-height: 40px;
  }

  .rbc-time-content {
    overflow-y: visible;
  }

  .rbc-today {
    background-color: ${({ theme }) => theme.colors['accent-2']};
  }
  .rbc-event {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const WeekHeader = styled.div`
  span {
    display: block;
  }
`;

const luxonLocalizer = LuxonLocalizer(DateTime, { firstDayOfWeek: 1 });

export function BigCalendar({
  height, width, className, components = {}, formats = {}, ...props
}: IBigCalendar) {
  let calendarComponents = {
    week: {
      header: ({ date, localizer }: { date: Date; localizer: any }) => (
        <WeekHeader>
          <span>{localizer.format(date, 'cccc')}</span>
          <span>{localizer.format(date, 'dd-MMM')}</span>
        </WeekHeader>
      ),
    },
  };
  // @ts-ignore
  calendarComponents.week.header.propTypes = {
    date: PropTypes.shape({}),
    localizer: PropTypes.shape({
      format: PropTypes.func,
    }),
  };

  let calendarFormats = {
    weekdayFormat: 'cccc',
  };

  calendarComponents = deepMerge(calendarComponents, components);
  calendarFormats = deepMerge(calendarFormats, formats);

  return (
    <CalendarContainer className={className} height={height} width={width}>
      <Calendar
        localizer={luxonLocalizer}
        formats={calendarFormats}
        // @ts-ignore
        components={calendarComponents}
        {...props}
      />
    </CalendarContainer>
  );
}

BigCalendar.propTypes = {
  components: PropTypes.shape({}),
  formats: PropTypes.shape({}),
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};
