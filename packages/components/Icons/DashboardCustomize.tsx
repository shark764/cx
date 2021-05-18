import * as React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';

export function DashboardCustomize(props: SvgIconProps): React.ReactElement {
  return (
    <SvgIcon {...props}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm15 0h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
    </SvgIcon>
  );
}
