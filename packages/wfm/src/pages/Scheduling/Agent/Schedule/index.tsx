import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import styled, { useTheme } from 'styled-components';
import { useQuery } from 'react-query';
import { useDivWidth } from '@cx/utilities/CustomHooks/useDivWidth';

import { addDays, removeDays, getMonday } from '@cx/utilities/date';
import { Message } from '@cx/components/Message';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { BigCalendar } from '@cx/components/DateTime/BigCalendar';
import { LoadSpinner } from '@cx/components/LoadSpinner';
import { Wrapper } from '@cx/components/Styled';
import { agentId, getAgentSchedule } from '@cx/fakedata/agentSchedule';
import { DateTime } from 'luxon';
import { IQuery } from '@cx/types';
import { Footer } from './Footer';
import { Event } from './Event';

const Container = styled(Wrapper)`
  width: 100%;
`;
const Toolbar = styled.div`
  margin: 10px auto;
  width: max-content;
  padding: 10px;
  display: grid;
  gap: 8px;
  grid-template-columns: fit-content(180px) fit-content(150px);
`;

const DatePickerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  .react-datepicker__input-container .custom-datepicker__input {
    padding: 2px 10px;
    line-height: 28px;
  }
`;
const LoadingMessage = styled.span`
  display: block;
  text-align: center;
  margin: 5px;
`;

export function AgentSchedule() {
  const displaySize = useSelector((state: RootState) => state.main.displaySize);
  const theme: any = useTheme();

  const [calDate, setCalDate] = React.useState(new Date());
  const [datePickerIsOpen, setDatePickerIsOpen] = React.useState(false);
  const [calendarView, setCalendarView] = React.useState('week');
  const [ref, width] = useDivWidth();
  const [isMobile, setIsMobile] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  React.useEffect(() => {
    width < displaySize ? setIsMobile(true) : setIsMobile(false);
  }, [width, displaySize]);

  React.useEffect(() => {
    isMobile ? setCalendarView('day') : setCalendarView('week');
  }, [isMobile]);

  const handleTouchStart = (e: any) => {
    setTouchStart(e.targetTouches[0].clientX);
  }

  const handleTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  const handleTouchEnd = () => {
    if (isMobile) {
      if (touchStart - touchEnd > 150) {
        setCalDate(addDays(calDate, 1));
      }

      if (touchStart - touchEnd < -150) {
        setCalDate(removeDays(calDate, 1));
      }
    }
  };

  const monday = getMonday(calDate);
  const fromDate = DateTime.fromJSDate(monday)
    .startOf('day')
    .toISO();
  const toDate = DateTime.fromJSDate(addDays(monday, 6))
    .endOf('day')
    .toISO();

  const { data, isLoading, error }: IQuery = useQuery(
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

  const events = React.useMemo(() => {
    if (isLoading && !data) {
      return [];
    }
    return data;
  }, [isLoading, data]);

  if (error) {
    return <Message text={error.message} messageType="error" />;
  }

  return (
    <Container ref={ref}>
      <Toolbar>
        <DatePickerContainer>
          <DatePicker
            selected={calDate}
            onChange={setCalDate}
            // locale="en-US"
            // open={datePickerIsOpen}
            // onFocus={() => setDatePickerIsOpen(true)}
            // onClickOutside={() => setDatePickerIsOpen(false)}
            // isClearable
            // className="custom-datepicker__input"
          />
        </DatePickerContainer>
      </Toolbar>

      {!isLoading ? (
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <BigCalendar
            events={events}
            defaultView={calendarView}
            date={calDate}
            onNavigate={setCalDate}
            views={{
              week: true,
              day: true,
            }}
            view={calendarView}
            onView={setCalendarView}
            toolbar={false}
            min={new Date(0, 0, 0, 7, 0, 0)}
            max={new Date(0, 0, 0, 23, 30, 0)}
            height="auto"
            step={30}
            timeslots={1}
            eventPropGetter={(event) => {
              const { style } = event;
              return {
                style,
              };
            }}
            components={{
              week: {
                event: Event,
              },
            }}
            formats={{
              eventTimeRangeFormat: () => null,
            }}
          />

          <Footer date={calDate} events={events} />
        </div>
      ) : (
        <>
          <LoadingMessage>Loading...</LoadingMessage>
          <LoadSpinner
            spinnerType="simple"
            size={25}
            weight={4}
            secondary
          />
        </>
      )}
    </Container>
  );
}
