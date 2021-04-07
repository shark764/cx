import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';
import { DatePicker } from '../DateTime/DatePicker';
import { DateTime } from 'luxon';
import DeleteIcon from '@material-ui/icons/Delete';
import { Plus } from '@cx/components/Icons/Plus';


interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
};

const MiniDate = styled.span`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  margin: 5px 0;
`;
const Trashcan = styled(DeleteIcon)`
  color: #808080a6;
  visibility: hidden;
  cursor: pointer;
`;
const PositionedPlus = styled(Plus)`
  visibility: hidden;
  margin-top: 25px;
`;
const RangeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  justify-items: center;
  &:hover ${Trashcan} {
    visibility: visible;
  }
  &:hover ${PositionedPlus} {
    visibility: visible;
  }
`;
const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;


const formatDate = (date: any) => DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');

export const DateRanges: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ onChange }) => (
      <DatePickers onChange={onChange} name={name} />
    )}
  />;

const DatePickers = ({onChange, name}: any) => {


  const [dateRanges, setDateRanges] = useState<any>([{startDate: null, endDate: null}]);

  const add = (index: number) => {
    const newRanges = [...dateRanges];
    newRanges.splice(index + 1, 0, {startDate: null, endDate: null});
    setDateRanges(newRanges);
  };
  const remove = (index: number) => {
    const newRanges = [...dateRanges];
    newRanges.splice(index, 1);
    setDateRanges(newRanges);
  };

  const update = (type: any, date: any, index: any) => {
    const rangeToUpdate = dateRanges[index];
    const newRange = {...rangeToUpdate, [type]: date}
    const tempArray = [...dateRanges];
    tempArray.splice(index, 1, newRange);
    setDateRanges(tempArray);
  };

  useEffect(() => {
    onChange(dateRanges.map(({startDate, endDate}: any) => ({ startDate: formatDate(startDate), endDate: formatDate(endDate) })))
  }, [dateRanges]);

  return (
    <span>

      {dateRanges.map(({startDate, endDate}: any, index: number) => {
        return <RangeContainer key={index} >
          <div style={{margin: '20px 0', width: '100%'}}>
            <MiniDate>
              <span>Start Date</span>
              <DatePicker
                className={name + 'startDate' + index}
                selected={startDate}
                onChange={(date: any) => { update('startDate', date, index) }}
              />
            </MiniDate>
            <MiniDate>
              <span>End Date</span>
              <DatePicker
                className={name + 'endDate' + index}
                selected={endDate}
                onChange={(date: any) => { update('endDate', date, index) }}
              />
            </MiniDate>
        </div>
            <Controls >
              <Trashcan onClick={() => remove(index)}  fontSize="small" />
              <PositionedPlus onClick={() => add(index)} size={15} />
            </Controls>
          </RangeContainer>
      })}
    </span>
  );
};