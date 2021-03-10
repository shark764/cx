import * as React from 'react';
import { Story } from '@storybook/react';
import { TimeBarSchedule, TimeBarScheduleProps } from '../TimeBarSchedule';
import { scheduledActivities } from '@cx/fakedata';

export default {
  title: 'Example/Time Bar Schedule',
};

export const TimeBarSchedules: Story<TimeBarScheduleProps> = (args) => <TimeBarSchedule {...args} />;
TimeBarSchedules.bind({});
TimeBarSchedules.args = {
  segments: scheduledActivities,
  domain: [0, 24],
};
