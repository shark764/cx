import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';
import { DatePicker } from '../DateTime/DatePicker';
import { DateTime } from 'luxon';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import South from '@material-ui/icons/South';
import AddIcon from '@material-ui/icons/Add';
import { addDays, getDiffInWeeks } from '@cx/utilities/date';

interface Props {
  control: Control;
  defaultValue: unknown;
  name: string;
  multiValue: boolean;
  errors: any;
  constraints: any;
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
const PositionedSouth = styled(South)`
  visibility: hidden;
  margin-top: 25px;
  fill: #808080be;
  cursor: pointer;
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
  &:hover ${PositionedSouth} {
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
  right: 0px;
  top: 10px;
  width: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const formatDate = (date: any) => DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');
const convertDate = (date: any) => date.isValid ? date : DateTime.fromJSDate(date);

const displayToDate = (endDate: any) => {
  if (endDate.isValid) {
    return endDate.toFormat('yyyy / LL / dd');
  } else if (DateTime.fromJSDate(endDate).isValid) {
    return formatDate(endDate);
  } else {
    return 'Choose a start date';
  }
};

export const EvenWeeks: React.VFC<Props> = ({ control, name, errors, constraints, defaultValue, multiValue }: any) => {

  const defaultStartDate = defaultValue?.[0]?.startDate;
  const defaultEndDate = defaultValue?.[0]?.endDate;

  const totalWeeks = getDiffInWeeks(defaultStartDate, defaultEndDate);

  const newEntry = { startDate: defaultStartDate || null, endDate: defaultEndDate || null, totalWeeks: totalWeeks };

  return <Controller
  control={control}
  name={name}
  defaultValue={newEntry}
  render={({ onChange }) => (
    <DatePickers
      onChange={onChange}
      name={name}
      multiValue={multiValue}
      control={control}
      errors={errors}
      constraints={constraints}
      initValue={newEntry}
    />
  )}
/>
};

interface EvenWeeks {
  startDate: Date | null,
  endDate: Date | null,
  totalWeeks: number;
};

const DatePickers = ({ onChange, name, control, errors, constraints, multiValue, initValue }: any) => {

  const newEntry = { startDate: null, endDate: null, totalWeeks: 1 };
  const [dateRanges, setDateRanges] = useState<EvenWeeks[]>([ initValue ]);

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
    const newRange = { startDate, endDate: addDays(startDate, (totalWeeks * 7) - 1), totalWeeks };
    const newArray = [...dateRanges];
    newArray.splice(index, 1, newRange);
    setDateRanges(newArray);
  };

  const updateTotalWeeks = (index: number, totalWeeks: number): void => {
    const { startDate } = dateRanges[index];
    // the minus 1 is to make the range inclusive and not exclusive
    const newRange = { startDate, endDate: addDays(startDate, (totalWeeks * 7) - 1), totalWeeks };
    const newArray = [...dateRanges];
    newArray.splice(index, 1, newRange);
    setDateRanges(newArray);
  };

  useEffect(() => {
    onChange(dateRanges.map(({ startDate, endDate }) => ({ startDate: convertDate(startDate), endDate: convertDate(endDate) })))
  }, [dateRanges, onChange]);

  return (
    <span>

      {dateRanges.map(({ startDate, endDate, totalWeeks }, index: number) => {
        return <RangeContainer key={index}>
          <div style={{ margin: '20px 0', width: '100%' }}>
            <MiniDate>
              <span>From</span>
              <Controller
                control={control}
                name={`${name}.startDate`}
                className={name + '-startDate'}
                defaultValue={startDate}
                rules={{
                  validate: {
                    required: (value) => !!value || constraints[name]?.startDate?.required,
                    isMonday: (value) => {
                      const weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
                      return weeks[new Date(value).getDay()] !== 'mon' ? constraints[name]?.startDate?.isMonday : !!value;
                    }
                  }
                }}
                render={({ onChange }) => (
                  <DatePicker
                    error={ Boolean(errors[name]?.startDate) }
                    helperText={errors?.[name]?.startDate?.message}
                    selected={startDate}
                    onChange={(date: Date) => {
                      onChange(date);
                      updateStartDate(index, date)
                    }}
                  />
                )}
              />
            </MiniDate>
            <MiniMultiplier>
              <span>Weeks</span>
              <span>
                <Controller
                  control={control}
                  name={`${name}.weeks`}
                  defaultValue={1}
                  rules={{
                    validate: {
                      required: (value) => !!value || constraints[name]?.weeks?.required,
                    }
                  }}
                  render={({ onChange }) => (
                    <TextField
                      size="small"
                      error={ Boolean(errors[name]?.weeks) }
                      helperText={errors?.[name]?.weeks?.message}
                      value={totalWeeks}
                      type="number"
                      className={`${name}-weeks`}
                      variant="outlined"
                      onChange={({ target: { value } }: any) => {
                        onChange(value);
                        updateTotalWeeks(index, value)
                      }}
                    />
                  )}
                />
                <IncrementControls>
                  <Decrement className={name + '-decrement'} onClick={() => updateTotalWeeks(index, totalWeeks - 1)} fontSize="small" />
                  <Increment className={name + '-increment'} onClick={() => updateTotalWeeks(index, totalWeeks + 1)} fontSize="small" />
                </IncrementControls>
              </span>
            </MiniMultiplier>
            <MiniDate style={{ height: '37px' }}>
              <span>To</span>
              {displayToDate(endDate)}
            </MiniDate>
          </div>
          {multiValue && <Controls >
            <Trashcan onClick={() => remove(index)} fontSize="small" />
            <PositionedSouth onClick={() => add(index)}></PositionedSouth>
          </Controls>}
        </RangeContainer>
      })}
    </span>
  );
};