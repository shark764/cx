import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';
import { DatePicker } from '../DateTime/DatePicker';
import { DateTime } from 'luxon';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Plus } from '@cx/components/Icons/Plus';
import { addDays } from '@cx/utilities/date';

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
const MiniMultiplier = styled.span`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  margin: 5px 0;
`;

const Trashcan = styled(RemoveIcon)`
  color: #aeaaaa;
  cursor: pointer;
`;
const PositionedPlus = styled(AddIcon)`
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

export const WeekMultiplier: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ onChange }) => (
      <DatePickers onChange={onChange} name={name} />
    )}
  />;

const DatePickers = ({onChange, name}: any) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [totalWeeks, setTotalWeeks] = useState(1);

  useEffect(() => {
    // TODO: if given 2 controls change the value of both?
    onChange({ startDate: formatDate(startDate), endDate: formatDate(endDate) })
  }, [startDate, endDate]);

  useEffect(() => {
    // @ts-ignore
    setEndDate(addDays(startDate, totalWeeks * 7));
  }, [totalWeeks]);

  const displayToDate = () => {
    const result = formatDate(endDate);
    // @ts-ignore
    return DateTime.fromJSDate(endDate).isValid ? result : 'Choose a start date';
  };

  return (
    <RangeContainer>
      <div style={{margin: '20px 0', width: '100%'}}>
        <MiniDate>
          <span>From</span>
          <DatePicker
            className={name + 'startDate'}
            selected={startDate}
            onChange={(date: Date) => {
              // @ts-ignore
              setStartDate(date);
              // @ts-ignore
              setEndDate(addDays(date, totalWeeks * 7));
            }}
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
              // onBlur={onBlur}
              // disabled={isFormSubmitting}
            />
              <IncrementControls>
                <Trashcan onClick={() => setTotalWeeks(totalWeeks - 1)}  fontSize="small" />
                <PositionedPlus onClick={() => setTotalWeeks(totalWeeks + 1)} fontSize="small" />
              </IncrementControls>
          </span>
        </MiniMultiplier>
        <MiniDate style={{height: '37px'}}>
          <span>To</span>
          { displayToDate() }
        </MiniDate>
      </div>
      <Controls >
        <Trashcan onClick={() => remove(index)}  fontSize="small" />
        <PositionedPlus onClick={() => add(index)} size={15} />
      </Controls>
    </RangeContainer>
  );
};