import * as React from 'react';
import { Story } from '@storybook/react';
import { TimeScale, TimeScaleProps } from '../TimeScale';

export default {
  title: 'Example/Time Scale',
};

export const TimeScaleNoProps: Story<TimeScaleProps> = (args) => <TimeScale {...args} />;

export const TimeScales: Story<TimeScaleProps> = (args) => <TimeScale {...args} />;
TimeScales.bind({});
TimeScales.args = {
  domain: [0, 24],
  range: [0, 0],
  standardTime: false
};
