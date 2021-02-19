import * as React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import { Divider } from '@cx/components/Divider';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { Calendar } from '@cx/components/Icons/Calendar';
import { Play } from '@cx/components/Icons/Play';
import { addDays } from '@cx/utilities/date';

const StyledDatePicker = styled(DatePicker)`
  margin-left: 5px;
`;

const DatePickerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 5px;
  margin-top: 20px;
  align-items: center;
  .react-datepicker__input-container .custom-datepicker__input {
    border: 0;
    padding: 2px 10px;
    line-height: 28px;
  }
`;

const BoxDiv = styled.div`
  border: 1px solid #80808096;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  background: white;
`;

const dateOptions = [
  { label: 'Day', id: 23425 },
  { label: 'Week', id: 4564576 },
  { label: 'Month', id: 456 },
  { label: 'Year', id: 34534 },
  { label: 'Date Range', id: 34536 },
];

const timeZonesOptions = [
  { label: 'America/Chigago', id: 23425 },
  { label: 'Canada/Halifax', id: 4564576 },
];

const competenceOptions = [{ label: 'Booking', id: 23425 }];

const FilterSections = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SelectSized = styled(Select)`
  width: 250px;
  display: inline-block;
  margin: 0px 10px;
`;
const SelectTimeSpanSized = styled(Select)`
  width: 140px;
  display: inline-block;
  margin: 0px 10px;
`;

const Title = styled.h4`
  color: grey;
  font-style: italic;
  margin-top: 0px;
  margin-left: 10px;
`;

const Label = styled.span`
  font-size: 11px;
  color: grey;
  vertical-align: super;
  margin-left: 10px;
`;

const LeftSideFilters = styled.div`
  display: grid;
  grid-template-columns: 180px 250px 260px 300px;
`;
const RightSideFilters = styled.div`
  display: grid;
  grid-template-columns: 300px;
`;

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: 'black',
    background: 'white',
  }),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export function Filters() {
  const [value, setValue] = React.useState([null, null]);

  const [calDate, setCalDate] = React.useState(new Date());
  const [datePickerIsOpen, setDatePickerIsOpen] = React.useState(false);
  const [selectedViewDataBy, setViewDataBy] = React.useState('quarter');

  const handleManuallyAddDays = (days: number) => {
    setCalDate((currentDate) => addDays(currentDate, days));
  };

  return (
    <BoxDiv>
      <Title> Schedule plan filters </Title>
      <FilterSections>
        <LeftSideFilters>
          <span>
            <Label> Time Span </Label>
            <SelectTimeSpanSized
              className="choose-date-range"
              classNamePrefix="select"
              defaultValue={dateOptions[1]}
              name="choose-date-range"
              options={dateOptions}
              styles={customStyles}
            />
          </span>
          <DatePickerContainer>
          <Calendar
            secondary
            size={17}
            onClick={() => setDatePickerIsOpen(true)}
          />
          <StyledDatePicker
            selected={calDate}
            onChange={setCalDate}
            open={datePickerIsOpen}
            onFocus={() => setDatePickerIsOpen(true)}
            onClickOutside={() => setDatePickerIsOpen(false)}
            className="custom-datepicker__input"
          />
          <Play
            secondary
            size={20}
            direction="left"
            onClick={() => handleManuallyAddDays(-1)}
          />
          <Play
            secondary
            size={20}
            onClick={() => handleManuallyAddDays(1)}
          />
          <Divider direction="vertical" secondary size={30} />
        </DatePickerContainer>
        <DatePickerContainer>
          <Calendar
            secondary
            size={17}
            onClick={() => setDatePickerIsOpen(true)}
          />
          <StyledDatePicker
            selected={calDate}
            onChange={setCalDate}
            open={datePickerIsOpen}
            onFocus={() => setDatePickerIsOpen(true)}
            onClickOutside={() => setDatePickerIsOpen(false)}
            className="custom-datepicker__input"
          />
          <Play
            secondary
            size={20}
            direction="left"
            onClick={() => handleManuallyAddDays(-1)}
          />
          <Play
            secondary
            size={20}
            onClick={() => handleManuallyAddDays(1)}
          />
        </DatePickerContainer>
          <span>
            <Label> Time Zone </Label>
            <SelectSized
              className="choose_time_zone"
              classNamePrefix="select"
              defaultValue={timeZonesOptions[0]}
              name="choose_time_zone"
              options={timeZonesOptions}
              styles={customStyles}
            />
          </span>
        </LeftSideFilters>
        <RightSideFilters>
          <span>
            <Label> Competence </Label>
            <SelectSized
              className="choose_competence"
              classNamePrefix="select"
              defaultValue={competenceOptions[0]}
              name="choose_competence"
              options={competenceOptions}
              styles={customStyles}
            />
          </span>
        </RightSideFilters>
      </FilterSections>
    </BoxDiv>
  );
}
