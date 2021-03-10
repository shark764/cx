import * as React from 'react';
import { Story } from '@storybook/react';
import { WorkSchedule } from '../WorkSchedule';
import { TimeBarScheduleProps } from '../TimeBarSchedule';
import { scheduledActivities, scheduledActivitiesPlus } from '@cx/fakedata';

export default {
  title: 'Example/Work Schedule',
};

export const ScheduledDay: Story<TimeBarScheduleProps> = (args) => <WorkSchedule {...args} />;
ScheduledDay.bind({});
ScheduledDay.args = {
  segments: scheduledActivities,
  domain: [0, 24],
  showTimeScale: true,
  standardTime: false,
};

export const ScheduledWeek: Story<TimeBarScheduleProps> = (args) => <WorkSchedule {...args} />;
ScheduledWeek.bind({});
ScheduledWeek.args = {
  segments: scheduledActivitiesPlus,
  domain: [0, 24 * 7],
  showTimeScale: false,
  standardTime: false,
};
