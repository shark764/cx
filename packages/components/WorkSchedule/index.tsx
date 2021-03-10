import * as React from 'react';
import { TimeScale } from '../TimeScale';
import { TimeBarSchedule, TimeBarScheduleProps } from '../TimeBarSchedule';

export const WorkSchedule: React.FC<TimeBarScheduleProps> = (props) => {
return <>
  <TimeScale domain={props.domain} />,
  <TimeBarSchedule {...props} />,
</>;
}