import * as React from 'react';
import { TimeScale } from '../TimeScale';
import { TimeBarSchedule, TimeBarScheduleProps } from '../TimeBarSchedule';
import styled from 'styled-components';

const Spacer = styled.div`
  height: 50px;
`;

export const WorkSchedule: React.FC<TimeBarScheduleProps> = (props) => {
return <>
  { props.showTimeScale &&
    <div>
      <TimeScale {...props} />
      <Spacer />
    </div>
  }
  <TimeBarSchedule {...props} />
</>;
}