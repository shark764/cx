import * as React from 'react';
import styled from 'styled-components';

const Spa = styled.span`
  position: relative;
`;
const Label = styled.span`
  font-style: italic;
  color:grey;
  margin-right: 10px;
`;
const Checkbox = styled.input`
  position: absolute;
  right: 20px;
`;
export const SinglePointAdjustment = ({singlePointAdjustment, setSinglePointAdjustment}: any): any => {
  return (
    <Spa>
      <Label>Single Point Adjustment</Label>
      {/* <Label>Show Tooltip</Label> */}
      <Checkbox checked={singlePointAdjustment} title=" " placeholder=" " type="checkbox" onChange={({target: { checked }}) => setSinglePointAdjustment(checked)} />
    </Spa>
  )
};
