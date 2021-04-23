import * as React from 'react';
import { Story } from '@storybook/react';
import { IIcon, DirectionalIcon } from '@cx/types/icon';
import { Calendar } from '../Icons/Calendar';
import { CheckMark } from '../Icons/CheckMark';
import { CloseIcon } from '../Icons/Close';
import { Dot } from '../Icons/Dot';
import { Play } from '../Icons/Play';
import { QuestionMark } from '../Icons/QuestionMark';
import { WarningIcon } from '../Icons/WarningIcon';
import { Next } from '../Icons/Next';
import { FastForward } from '../Icons/FastForward';
import { Info } from '../Icons/Info';
import { Chevron } from '../Icons/Chevron';
import { Clock } from '../Icons/Clock';
import { Plus } from '../Icons/Plus';
import { Remove } from '../Icons/Remove';
import { Loading } from '../Icons/Loading';
import { Ellipsis } from '../Icons/Ellipsis';
import { Insights } from '../Icons/Insights';

export default {
  title: 'Example/Icons',
  argTypes: {
    fill: { control: 'color' },
  },
};

export const CheckMarkIcon: Story<IIcon> = (args) => <CheckMark {...args} />;
CheckMarkIcon.bind({});
CheckMarkIcon.args = {
  size: 100,
  fill: '#07487a',
  disabled: false,
};

export const CalendarIcon: Story<IIcon> = (args) => <Calendar {...args} />;
CalendarIcon.bind({});
CalendarIcon.args = {
  size: 100,
  fill: '#07487a',
  disabled: false,
};

export const Close: Story<IIcon> = (args) => <CloseIcon {...args} />;
Close.bind({});
Close.args = {
  size: 100,
  fill: '#07487a',
};

export const DotIcon: Story<IIcon> = (args) => <Dot {...args} />;
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

export const QuestionMarkIcon: Story<IIcon> = (args) => <QuestionMark {...args} />;
QuestionMarkIcon.bind({});
QuestionMarkIcon.args = {
  size: 100,
  fill: '#07487a',
  disabled: false,
};

export const Warning: Story<IIcon> = (args) => <WarningIcon {...args} />;
Warning.bind({});
Warning.args = {
  size: 100,
};

export const NextIcon: Story<IIcon> = (args) => <Next {...args} />;
NextIcon.bind({});
NextIcon.args = {
  size: 100,
  fill: '#07487a',
  disabled: false,
};

export const FastForwardIcon: Story<IIcon> = (args) => <FastForward {...args} />;
FastForwardIcon.bind({});
FastForwardIcon.args = {
  size: 100,
  fill: '#07487a',
  disabled: false,
};

export const InfoIcon: Story<IIcon> = (args) => <Info {...args} />;
InfoIcon.bind({});
InfoIcon.args = {
  size: 100,
  fill: '#07487a',
  disabled: false,
};

export const ChevronIcon: Story<IIcon> = (args) => <Chevron {...args} />;
ChevronIcon.bind({});
ChevronIcon.args = {
  size: 100,
  rotate: 0,
  fill: '#07487a',
  disabled: false,
};

export const ClockIcon: Story<IIcon> = (args) => <Clock {...args} />;
ClockIcon.bind({});
ClockIcon.args = {
  size: 100,
  fill: '#07487a',
  disabled: false,
};

export const RemoveIcon: Story<IIcon> = (args) => <Remove {...args} />;
RemoveIcon.bind({});
RemoveIcon.args = {
  size: 100,
  fill: 'red',
  disabled: false,
};

export const PlusIcon: Story<IIcon> = (args) => <Plus {...args} />;
PlusIcon.bind({});
PlusIcon.args = {
  size: 100,
  fill: '#07487a',
  disabled: false,
};

export const LoadingIcon: Story<any> = (args) => <Loading {...args} />;
LoadingIcon.bind({});
LoadingIcon.args = {
  size: 100,
  fill: '#07487a',
};

export const EllipsisAnimated: Story<any> = (args) => <Ellipsis {...args} />;
EllipsisAnimated.bind({});
EllipsisAnimated.args = {
  width: 100,
  fill: '#07487a',
  animated: true,
};
export const EllipsisStatic: Story<any> = (args) => <Ellipsis {...args} />;
EllipsisStatic.bind({});
EllipsisStatic.args = {
  width: 30,
  fill: 'grey',
  animated: false,
};

export const InsightsAnimated: Story<any> = (args) => <Insights {...args} />;
InsightsAnimated.bind({});
InsightsAnimated.args = {
  width: 100,
  fill: 'rgb(241, 113, 0)',
  animated: true
};

export const InsightsStatic: Story<any> = (args) => <Insights {...args} />;
InsightsStatic.bind({});
InsightsStatic.args = {
  width: 100,
  fill: 'rgb(25, 161, 26)',
  animated: false
};

