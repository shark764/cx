import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

interface MeterProps {
  gridColValues: string;
}
const Meter = styled.div<MeterProps>`
  border: 2px solid ${({ theme }) => theme.colors['accent-3']};
  border-radius: 8px;
  overflow: hidden;
  display: grid;
  grid-template-columns: ${({ gridColValues }) => gridColValues};
`;
interface ColumnProps {
  bgColor: string;
}
const Column = styled.div.attrs<ColumnProps>((props) => ({
  bgColor: props.bgColor || props.theme.colors.primary,
}))<ColumnProps>`
  background: ${(props) => props.bgColor};
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface StackedBarProps {
  columns: Array<{
    value: number;
    bgColor: string;
    name: string;
  }>;
}
export function StackedBar({ columns }: StackedBarProps) {
  return (
    <Meter
      gridColValues={columns.map((column) => `${column.value}fr`).join(' ')}
    >
      {columns.map((column) => (
        <Column bgColor={column.bgColor} title={column.name} key={column.name}>
          {column.value}
        </Column>
      ))}
    </Meter>
  );
}

StackedBar.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      bgColor: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.number,
    })
  ),
};
