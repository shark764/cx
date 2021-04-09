import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';
import { DatePicker } from '../DateTime/DatePicker';
import { DateTime } from 'luxon';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Plus } from '@cx/components/Icons/Plus';
import { addDays } from '@cx/utilities/date';


interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
  multiValue: boolean;
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
const Decrement = styled(RemoveIcon)`
  color: #aeaaaa;
  cursor: pointer;
`;
const Increment = styled(AddIcon)`
  color: #aeaaaa;
  cursor: pointer;
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
const MiniMultiplier = styled.span`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  margin: 5px 0;
`;
const IncrementControls = styled.span`
  position: absolute;
  right: 5px;
  top: 10px;
  width: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid hsl(0,0%,80%);
  padding: 10px 15px;
  outline: none;
`;

const formatDate = (date: any) => DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');
const displayToDate = (endDate) => {
  const result = formatDate(endDate);
  // @ts-ignore
  return DateTime.fromJSDate(endDate).isValid ? result : 'Choose a start date';
};

export const EvenWeeks: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue, multiValue}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ onChange }) => (
      <DatePickers
        onChange={onChange}
        name={name}
        multiValue={multiValue}
      />
    )}
  />;

interface EvenWeeks {
  startDate: Date | null,
  endDate: Date | null,
  totalWeeks: number;
};

const DatePickers = ({onChange, name, multiValue}: any) => {
  const newEntry = {startDate: null, endDate: null, totalWeeks: 1};
  const [dateRanges, setDateRanges] = useState<EvenWeeks[]>([newEntry]);

  const add = (index: number) => {
    const newRanges = [...dateRanges];
    newRanges.splice(index + 1, 0, newEntry);
    setDateRanges(newRanges);
  };
  const remove = (index: number) => {
    const newRanges = [...dateRanges];
    newRanges.splice(index, 1);
    setDateRanges(newRanges);
  };

  const updateStartDate = (index: number, startDate: Date): void => {
    const { totalWeeks } = dateRanges[index];
    const newRange = { startDate, endDate: addDays(startDate, totalWeeks * 7), totalWeeks };
    const newArray = [...dateRanges];
    newArray.splice(index, 1, newRange);
    setDateRanges(newArray);
  };
// TODO: make it so startDate can only be mondays, for at least the historical range
  const updateTotalWeeks = (index: number, totalWeeks: number): void => {
    const { startDate } = dateRanges[index];
    // TODO: the calculation is not very efficient?
    // the minus 1 is to make the range inclusive and not exclusive
    const newRange = { startDate, endDate: addDays(startDate, (totalWeeks * 7) - 1 ), totalWeeks };
    const newArray = [...dateRanges];
    newArray.splice(index, 1, newRange);
    setDateRanges(newArray);
  };

  useEffect(() => {
    onChange(dateRanges.map(({startDate, endDate}) => ({ startDate: formatDate(startDate), endDate: formatDate(endDate) })))
  }, [dateRanges]);

  return (
    <span>

      {dateRanges.map(({startDate, endDate, totalWeeks}, index: number) => {
        return <RangeContainer key={index}>
        <div style={{margin: '20px 0', width: '100%'}}>
          <MiniDate>
            <span>From</span>
            <DatePicker
              className={name + 'startDate'}
              selected={startDate}
              onChange={(date: Date) => updateStartDate(index, date) }
            />
          </MiniDate>
          <MiniMultiplier>
            <span>Weeks</span>
            <span>
              <Input
                value={totalWeeks}
                type="number"
                className={name}
                onChange={onChange}
              />
                <IncrementControls>
                  <Decrement className={name + '-decrement'} onClick={() => updateTotalWeeks(index, totalWeeks - 1)}  fontSize="small" />
                  <Increment className={name + '-increment'} onClick={() => updateTotalWeeks(index, totalWeeks + 1)} fontSize="small" />
                </IncrementControls>
            </span>
          </MiniMultiplier>
          <MiniDate style={{height: '37px'}}>
            <span>To</span>
            { displayToDate(endDate) }
          </MiniDate>
        </div>
        { multiValue && <Controls >
          <Trashcan onClick={() => remove(index)}  fontSize="small" />
          <PositionedPlus onClick={() => add(index)} size={15} />
        </Controls>}
      </RangeContainer>
      })}
    </span>
  );
};