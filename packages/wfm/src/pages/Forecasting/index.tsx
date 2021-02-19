import * as React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Divider } from '@cx/components/Divider';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { Calendar } from '@cx/components/Icons/Calendar';
import { Play } from '@cx/components/Icons/Play';
import { addDays } from '@cx/utilities/date';

import { DropdownFilter } from './Components/dropDown';
import { RadioFilter } from './Components/radio';
import { ForecastingTable } from './Components/table';
import BarChart from '@cx/components/Charts/BarChart';
import LineChart from '@cx/components/Charts/LineChart';
import { filters, dayAdjusted } from './fakeData';

const FiltersWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #80808096;
  border-radius: 5px;
  font-size: 12px;
`;

const ChartsWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #80808096;
  border-radius: 5px;
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

const StyledDatePicker = styled(DatePicker)`
  margin-left: 5px;
  borderColor: hsl(0, 0%, 80%);
`;

const StyledDivider = styled(Divider)`
  margin: 0 15px;
`;

const useStyles = makeStyles({
  root: {
    minWidth: '210px',
    height: 38,
    marginLeft: '10px',
    marginTop: '15px',
    fontSize: '12px',
    textTransform: 'capitalize',
    borderColor: 'hsl(0, 0%, 80%)',
  },
});

export function Forecasting() {

  const [calDate, setCalDate] = React.useState(new Date());
  const [datePickerIsOpen, setDatePickerIsOpen] = React.useState(false);
  const [selectedViewDataBy, setViewDataBy] = React.useState('quarter');

  const handleManuallyAddDays = (days: number) => {
    setCalDate((currentDate) => addDays(currentDate, days));
  };

  const changeViewDataBy = (event: any) => {
    setViewDataBy(() => event.target.value)
  };

  const classes = useStyles();

  const buttonClass = {
    root: classes.root,
  };

  return (
    <>
      <FiltersWrapper>
        <DropdownFilter
          filterTitle="VIEW BY"
          className="choose-date-range"
          defaultValue={filters.viewBy[0]}
          options={filters.viewBy}
        />
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
        <StyledDivider direction="vertical" secondary size={60} />
        <DropdownFilter
          filterTitle="COMPETENCE"
          className="choose-competence"
          defaultValue={filters.competence[1]}
          options={filters.competence}
        />
        <DropdownFilter
          filterTitle="CHANNEL"
          className="choose-channel"
          defaultValue={filters.channel[1]}
          options={filters.channel}
        />
        <DropdownFilter
          filterTitle="DIRECTION"
          className="choose-direction"
          defaultValue={filters.direction[1]}
          options={filters.direction}
        />
        <StyledDivider direction="vertical" secondary size={60} />
        <Button classes={buttonClass} variant="outlined">RUN QUICK SCENARIO</Button>
        <Button classes={buttonClass} variant="outlined">REMOVE SCENARIO</Button>
      </FiltersWrapper>

      <ChartsWrapper>
        <LineChart
          chartName="staffingEstimate"
          data={dayAdjusted.lineChart.data}
          xDataKey={dayAdjusted.lineChart.xDataKey}
          dataKeys={dayAdjusted.lineChart.dataKeys}
        />
        <BarChart
          chartName="staffingEstimate"
          statName="STAFFING ESTIMATE"
          data={dayAdjusted.barChart.data}
          xDataKey={dayAdjusted.barChart.xDataKey}
          dataKeys={dayAdjusted.barChart.dataKeys}
        />
      </ChartsWrapper>

      <FiltersWrapper>
        <RadioFilter isChecked={selectedViewDataBy === 'quarter'} onChange={changeViewDataBy} value="quarter" label="QUARTERS" />
        <RadioFilter isChecked={selectedViewDataBy === 'hours'} onChange={changeViewDataBy} value="hours" label="HOURS" />
        <RadioFilter isChecked={selectedViewDataBy === 'day'} onChange={changeViewDataBy} value="day" label="DAY" />
        <StyledDivider direction="vertical" secondary size={60} />
        <DropdownFilter
          filterTitle="COMPETENCE"
          className="choose-competence"
          defaultValue={filters.competence[1]}
          options={filters.competence}
        />
        <DropdownFilter
          filterTitle="CHANNEL"
          className="choose-channel"
          defaultValue={filters.channel[1]}
          options={filters.channel}
        />
        <DropdownFilter
          filterTitle="DIRECTION"
          className="choose-direction"
          defaultValue={filters.direction[1]}
          options={filters.direction}
        />
        <StyledDivider direction="vertical" secondary size={60} />
        <RadioFilter isChecked={selectedViewDataBy === 'volume'} onChange={changeViewDataBy} value="volume" label="VOLUME" />
        <RadioFilter isChecked={selectedViewDataBy === 'aht'} onChange={changeViewDataBy} value="aht" label="AHT" />
      </FiltersWrapper>

      <FiltersWrapper>
        <ForecastingTable />
      </FiltersWrapper>
    </>
  );
}
