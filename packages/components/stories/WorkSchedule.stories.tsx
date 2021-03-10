import * as React from 'react';
import { Story } from '@storybook/react';
import { WorkSchedule } from '../WorkSchedule';
import { TimeBarScheduleProps } from '../TimeBarSchedule';
import { scheduledActivities } from '@cx/fakedata';

export default {
  title: 'Example/Work Schedule',
};

export const Schedule: Story<TimeBarScheduleProps> = (args) => <WorkSchedule {...args} />;
Schedule.bind({});
Schedule.args = {
  segments: scheduledActivities,
  domain: [0, 24],
};
