import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import { Event } from './Event';
import { Footer } from './Footer';
import { getAgentSchedule } from './fake-data';
import { addDays } from '@cx/wfm/utilities/date';
import { Message } from '@cx/components/Message';
import { Play } from '@cx/components/Icons/Play';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { Divider } from '@cx/components/Divider';
import { Calendar } from '@cx/components/Icons/Calendar';
import { BigCalendar } from '@cx/components/DateTime/BigCalendar';
import { LoadSpinner } from '@cx/components/LoadSpinner';

const Container = styled.div`
  width: 70%;
`;
const Toolbar = styled.div`
  margin: 25px auto;
  width: max-content;
  padding: 10px;
  display: grid;
  gap: 8px;
  grid-template-columns: min-content min-content max-content;
`;

const DatePickerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  .react-datepicker__input-container .custom-datepicker__input {
    border: 0;
    padding: 2px 10px;
    line-height: 28px;
  }
`;
const LoadingMessage = styled.span`
  display: block;
  text-align: center;
  margin: 5px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const agentId = 'b47027e0-1126-11ea-953d-9bdc6d6573af';

export function AgentSchedule() {
  const [calDate, setCalDate] = React.useState(new Date());
  const [datePickerIsOpen, setDatePickerIsOpen] = React.useState(false);

  const { data, isLoading, error } = useQuery(
    'fetchAgentSchedule',
    async () =>
      getAgentSchedule(agentId)
        .then((result: any) => result.data)
        .catch((err) => {
          console.error(err);
          throw err;
        }),
    {
      refetchInterval: 30000,
    }
  );

  const handleManuallyAddDays = (days: number) => {
    setCalDate((currentDate) => addDays(currentDate, days));
  };

  const events = React.useMemo(() => {
    if (isLoading && !data) {
      return [];
    }
    return data;
  }, [isLoading, data]);

  if (error) {
    return <Message text="error" messageType="error" />;
  }

  return (
    <Container>
      <Toolbar>
        <Play
          secondary
          direction="left"
          onClick={() => handleManuallyAddDays(-7)}
          title="Previous week"
        />
        <Play
          secondary
          onClick={() => handleManuallyAddDays(7)}
          title="Next week"
        />

        <DatePickerContainer>
          <DatePicker
            selected={calDate}
            onChange={setCalDate}
            // locale="en-US"
            open={datePickerIsOpen}
            onFocus={() => setDatePickerIsOpen(true)}
            onClickOutside={() => setDatePickerIsOpen(false)}
            // isClearable
            className="custom-datepicker__input"
          />

          <Divider direction="vertical" secondary size={30} />

          <Calendar
            secondary
            onClick={() => setDatePickerIsOpen(true)}
            title="Open calendar"
          />
        </DatePickerContainer>
      </Toolbar>

      {!isLoading ? (
        <>
          <BigCalendar
            events={events}
            defaultView="week"
            date={calDate}
            onNavigate={setCalDate}
            views={{
              // month: true,
              week: true,
            }}
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
        </>
      ) : (
        <div>
          <LoadingMessage>Loading...</LoadingMessage>
          <LoadSpinner spinnerType="simple" size={25} weight={4} secondary />
        </div>
      )}
    </Container>
  );
}
