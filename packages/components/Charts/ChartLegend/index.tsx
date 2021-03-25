import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  font-size: 12px;
`;

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 20px;
`;

const Label = styled.span`
`;

interface LineType {
  lineType?: string;
}

const Line = styled.hr<LineType>`
  display: inline-block;
  width: 60px;
  height: 1px;
  margin-left: 15px;
  border: ${({ lineType }) => lineType === 'dotted' ? '1px dashed black' : '1px solid black'}
`;

const CustomLegend = ({ payload }: any) => {
  return (
    <Container>
      {payload.map((a: any, idx: number) => (
        <Wrapper key={ idx.toString() }>
          <Label>{a.dataKey}:</Label>
          <Line lineType={a.dataKey === 'aht' ? 'solid':'dotted'} />
        </Wrapper>
      ))}
    </Container>
  )
};

export default CustomLegend;