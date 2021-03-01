import * as React from 'react';
import { Story } from '@storybook/react';
import { Calendar } from '../Icons/Calendar';
import { CheckMark } from '../Icons/CheckMark';
import { CloseIcon } from '../Icons/Close';
import { Dot } from '../Icons/Dot';
import { Play } from '../Icons/Play';
import { QuestionMark } from '../Icons/QuestionMark';
import { WarningIcon } from '../Icons/WarningIcon';

import { BasicIconProps, DirectionalIcon } from '@cx/types/icon';

export default {
  title: 'Example/Icons',
  argTypes: {
    fill: { control: 'color' },
  }
};

export const CheckMarkIcon: Story<BasicIconProps> = (args) => <CheckMark {...args} />;
CheckMarkIcon.bind({});
CheckMarkIcon.args = {
  size: 100,
  fill: '#07487a',
  disabled: false,
};

export const CalendarIcon: Story<BasicIconProps> = (args) => <Calendar {...args} />;
CalendarIcon.bind({});
CalendarIcon.args = {
  size: 100,
  fill: '#07487a',
  disabled: false,
};

export const Close: Story<BasicIconProps> = (args) => <CloseIcon {...args} />;
Close.bind({});
Close.args = {
  size: 100,
  fill: '#07487a',
};

export const DotIcon: Story<BasicIconProps> = (args) => <Dot {...args} />;
DotIcon.bind({});
DotIcon.args = {
  size: 100,
  fill: '#07487a',
};


export const PlayIcon: Story<DirectionalIcon> = (args) => <Play {...args} />;
PlayIcon.bind({});
PlayIcon.args = {
  size: 100,
  fill: '#07487a',
  disabled: false,
  direction: 'right',
};


export const QuestionMarkIcon: Story<BasicIconProps> = (args) => <QuestionMark {...args} />;
QuestionMarkIcon.bind({});
QuestionMarkIcon.args = {
  size: 100,
  fill: '#07487a',
  disabled: false,
};


export const Warning: Story<BasicIconProps> = (args) => <WarningIcon {...args} />;
Warning.bind({});
Warning.args = {
  size: 100,
};
