import * as React from 'react';
import { Story } from '@storybook/react';
import { Table, TableProps } from '../Table';
import { day } from '@cx/fakedata/1day';

export default {
  title: 'Example/Table',
};

export const BasicTable: Story<TableProps> = (args) => <Table {...args} />;
BasicTable.bind({});
BasicTable.args = {
  tableData: day.data
};
