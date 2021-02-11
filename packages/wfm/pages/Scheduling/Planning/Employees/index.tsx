import * as React from 'react';

import { Tabs, Tab } from '@cx/components/Tabs/Tabs';
import { Agents } from './Agents';
import { Competencies } from './Competencies';
import { Restrictions } from './Restrictions';
import { Availabilities } from './Availabilities';

export function Employees() {
  return (
    <Tabs activeIndex={0} primary>
      <Tab label="Agents">
        <Agents />
      </Tab>
      <Tab label="Competencies">
        <Competencies />
      </Tab>
      <Tab label="Restrictions">
        <Restrictions />
      </Tab>
      <Tab label="Availabilities">
        <Availabilities />
      </Tab>
    </Tabs>
  );
}
