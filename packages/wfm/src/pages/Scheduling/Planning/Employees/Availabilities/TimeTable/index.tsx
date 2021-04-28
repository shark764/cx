import * as React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Message } from '@cx/components/Message';
import { getAgentAvailabilityTimeTable } from '@cx/fakedata/planningEmployeesAvailabilities';
import { LoadSpinner } from '@cx/components/LoadSpinner';
import { Tab, Tabs } from '@cx/components/Tabs/Tabs';
import { DateTime } from 'luxon';
import { useFormState } from 'context/RowSelection';
import { Button } from '@cx/components/Inputs/Button';
import {
  Dash, Label, SimpleTable, Wrapper,
} from '@cx/components/Styled';
import { ISingleRowFormContext } from '@cx/types/form';

const Container = styled.div`
  margin-left: 40px;
`;

const TrText = styled.span`
  display: block;
  text-align: center;
  margin: 5px;

`;
const EditButton = styled(Button)`
  padding: 6px 18px;
  border-radius: 4px;
`;
const AgentHeader = styled.h2`
  text-align: center;
`;
const Label2 = styled(Label)`
  margin: 0;
`;
const Tabs2 = styled(Tabs)`
  margin-top: -15px;
`;
const StrongText = styled.span`
  font-weight: bold;
  margin: 5px;
`;

function dayAvailability(dayAvailable: string, startTime: string, endTime: string) {
  if (startTime && endTime) {
    return (
      <span>
        {startTime}
        <Dash />
        {endTime}
      </span>
    );
  }
  // Renders "A" for Available,
  // "U" for Unavailable
  return dayAvailable.charAt(0).toUpperCase();
}

function Week({ week }: any) {
  return (
    <div className="st-row">
      <span className="st-cell">{week.week}</span>
      <span className="st-cell">{dayAvailability(week.sundayAvailable, week.sundayStart, week.sundayEnd)}</span>
      <span className="st-cell">{dayAvailability(week.mondayAvailable, week.mondayStart, week.mondayEnd)}</span>
      <span className="st-cell">{dayAvailability(week.tuesdayAvailable, week.tuesdayStart, week.tuesdayEnd)}</span>
      <span className="st-cell">
        {dayAvailability(week.wednesdayAvailable, week.wednesdayStart, week.wednesdayEnd)}
      </span>
      <span className="st-cell">{dayAvailability(week.thursdayAvailable, week.thursdayStart, week.thursdayEnd)}</span>
      <span className="st-cell">{dayAvailability(week.fridayAvailable, week.fridayStart, week.fridayEnd)}</span>
      <span className="st-cell">{dayAvailability(week.saturdayAvailable, week.saturdayStart, week.saturdayEnd)}</span>
    </div>
  );
}

interface IAvailabilityTimetable {
  timetable: any;
  handleEdit(param: any): void;
}
function AvailabilityTimetable({ timetable, handleEdit }: IAvailabilityTimetable) {
  return (
    <Wrapper>
      <p>
        Start Date:
        <StrongText>{DateTime.fromJSDate(timetable.startDate).toLocaleString(DateTime.DATE_HUGE)}</StrongText>
      </p>
      <p>
        End Date:
        <StrongText>{DateTime.fromJSDate(timetable.endDate).toLocaleString(DateTime.DATE_HUGE)}</StrongText>
      </p>

      <SimpleTable numCol={8} className="simple-table">
        <div className="st-row">
          <span className="st-cell st-header">Week</span>
          <span className="st-cell st-header">Sunday</span>
          <span className="st-cell st-header">Monday</span>
          <span className="st-cell st-header">Tuesday</span>
          <span className="st-cell st-header">Wednesday</span>
          <span className="st-cell st-header">Thursday</span>
          <span className="st-cell st-header">Friday</span>
          <span className="st-cell st-header">Saturday</span>
        </div>
        {timetable.weeks.map((week: any) => (
          <Week week={week} key={week.week.toString()} />
        ))}
      </SimpleTable>

      {timetable.connectTo && (
        <p>
          Also connected to
          <StrongText>{timetable.connectTo.name}</StrongText>
        </p>
      )}

      <EditButton type="button" onClick={handleEdit} label="Edit Timetable" primary />
    </Wrapper>
  );
}

export function TimeTable({ row }: any) {
  const {
    original: { agentId },
  } = row;
  const { setFormState }: ISingleRowFormContext = useFormState();

  const { data, isLoading, error } = useQuery<any, Error>(
    ['fetchAgentAvailabilityTimeTable', { agentId }],
    getAgentAvailabilityTimeTable,
    { refetchInterval: 30000 },
  );

  const memoData = React.useMemo(() => data || [], [data]);

  if (error) {
    return (
      <Container className="full-cell">
        <Message text={error.message} messageType="error" />
      </Container>
    );
  }

  return (
    <Container className="full-cell">
      {isLoading ? (
        <span>
          <TrText>Loading...</TrText>
          <LoadSpinner spinnerType="simple" secondary />
        </span>
      ) : (
        <>
          {memoData.length ? (
            <>
              <AgentHeader>{row.original.agent}</AgentHeader>
              <Label2>Availability Timetable</Label2>
              <Tabs2 activeIndex={0} primary>
                {memoData.map((timetable: any) => (
                  <Tab label={timetable.name} key={timetable.id}>
                    <AvailabilityTimetable
                      timetable={timetable}
                      handleEdit={() => setFormState({ ...row.original, timetable }, true)}
                    />
                  </Tab>
                ))}
              </Tabs2>
            </>
          ) : (
            <TrText>No records found</TrText>
          )}
        </>
      )}
    </Container>
  );
}
