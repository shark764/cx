import * as React from 'react';

import { Tabs, Tab } from '@cx/components/Tabs/Tabs';

export function Employees() {
  return (
    <div>
      Employees here!
      <div className="tabs">
        <h1>React Tabs</h1>
        <Tabs activeIndex={2}>
          <Tab label="Tab 1" primary>
            <div>
              <p>Tab 1 content</p>
            </div>
          </Tab>
          <Tab label="Tab 2" primary>
            <div>
              <p>Tab 2 content</p>
            </div>
          </Tab>
          <Tab label="Tab 3" primary>
            <div>
              <p>Tab 3 content</p>
            </div>
          </Tab>
          <Tab label="Tab 4" primary>
            <div>
              <p>Tab 4 content</p>
            </div>
          </Tab>
          <Tab label="Tab 5" primary disabled>
            <div>
              <p>Tab 5 content</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
