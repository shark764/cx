import * as React from 'react';
import { Story } from '@storybook/react';
import { DateRange } from '../DateRange';

export default {
  title: 'Example/Date Range',
};

export const BasicDateRange: Story<any> = (args) => <DateRange {...args} />;
BasicDateRange.bind({});
BasicDateRange.args = {
};
