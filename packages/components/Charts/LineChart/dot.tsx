import * as React from 'react';

export const CustomDot: React.VFC<any> = ({ topValue, dataKey, fill, ...props }) => {
  return props.value ?
    <circle
      {...props}
      r="7"
      fill={fill}
      data-type={dataKey}
      data-ceiling={topValue}
      data-timestamp={props.payload.ogTimestamp}
    />
  : null;
};