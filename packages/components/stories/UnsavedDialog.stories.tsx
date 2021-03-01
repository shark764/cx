import * as React from 'react';
import { Story } from '@storybook/react';
import { UnsavedDialog, SimpleDialogProps } from '../UnsavedDialog';

export default {
  title: 'Example/Unsaved Dialog',
};

export const UnsavedChanges: Story<SimpleDialogProps> = (args) => <UnsavedDialog {...args} />;
UnsavedChanges.bind({});
UnsavedChanges.args = {
  open: false,
};
