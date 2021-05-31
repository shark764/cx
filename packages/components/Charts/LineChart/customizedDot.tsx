import * as React from 'react';

export const CustomizedDot = ({isDragging, dataKey, ...props}: any): any => {
  const show = isDragging && dataKey !== 'nco' && dataKey !== 'aht';
  return (
    <circle
      {...props}
      className="fancy-dot"
      fill={show ? 'white' : 'none'}
      stroke={show ? 'blue' : 'none'}
      datatimestamp={props.payload.ogTimestamp}
      datakey={dataKey}
    ></circle>
  )
};
