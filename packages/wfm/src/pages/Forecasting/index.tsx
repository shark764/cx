import * as React from 'react';
import styled, { css } from 'styled-components';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Divider } from '@cx/components/Divider';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { Calendar } from '@cx/components/Icons/Calendar';
import { Play } from '@cx/components/Icons/Play';
import { addDays, disableDays } from '@cx/utilities/date';

import BarChart from '@cx/components/Charts/BarChart';
import LineChart from '@cx/components/Charts/LineChart';
import { ForecastingTable } from './Components/table';
import { CreateNewForecastPane } from './createForecast';
import { DeleteForecastPane } from './deleteForecast';
import { filters, barChart, lineChart, tableData } from './fakeData';

const FiltersWrapper = styled.div`
  display: flex;
  padding: 5px;
  font-size: 12px;
  margin-left: 50px;
`;

const StyledSelect = styled(Select)`
  display: inline-block;  
  width: 200px;
  height: 35px;
  border-color: #07487a;
`;

const DatePickerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  .react-datepicker__input-container .custom-datepicker__input {
    border: 0;
    padding: 2px 10px;
    line-height: 28px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  margin-left: 5px;
  borderColor: #80808096;
`;

const StyledCalendar = styled(Calendar)`
  margin-left: 10px;
`;

const StyledPlay = styled(Play)`
  margin-left: 10px;
`;

const useStyles = makeStyles({
  root: {
    width: '160px',
    maxWidth: '160px',
    height: 40,
    marginLeft: '10px',
    fontSize: '12px',
    textTransform: 'capitalize',
    flexGrow: 1,
  },
});

const HorizontalDivider = styled.div`
  border-top: 1px solid #80808096;
  margin: 15px 15px;
`;

const StyledDivider = styled(Divider)`
  margin: 0 15px;
`;

const ChartsWrapper = styled.div`
  width: 100%;
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

const TableWrapper = styled.div`
  margin-top: 20px;
  margin-left: 30px;
  font-size: 12px;
`;

const Label = styled.span`
   margin-right: 15px;
`;

const ButtonsWrapper = styled.div`
  position: relative;
`;

export function Forecasting() {
  
  const classes = useStyles();
  const buttonClass = {
    root: classes.root,
  };

  const [competence, setCompetence] = React.useState('selectCompetence');
  const [viewBy, setViewBy] = React.useState('day');
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  const [createNewForecast, setCreateNewForecast] = React.useState(false);
  const [deleteForecast, setDeleteForecast] = React.useState(false)

  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = React.useState(false);
  const [isToDatePickerOpen, setIsToDatePickerOpen] = React.useState(false);

  const changeCompetence = ({ value }: { value: string }) => setCompetence(value);
  const changeViewBy = ({ value }: { value: string }) => setViewBy(value);

  const handleManuallyAddDays = (dateType: string, days: number) => {
    if (dateType === 'from') {
      setFromDate((currentDate) => addDays(currentDate, days));
    } else {
      setToDate((currentDate) => addDays(currentDate, days));
    }
  };
  const filterDate = (date: Date) => {
    if (viewBy === "week") {
      return disableDays(date, 'onlyEnableMonday');
    }
    return true;
  };

  return (
    <>
      <FiltersWrapper>
        <StyledSelect
          className="choose-competence"
          classNamePrefix="select"
          defaultValue={filters.competence[0]}
          name="choose-competence"
          options={filters.competence.filter(a => a.value !== competence && a.value !== 'selectCompetence')}
          styles={customStyles}
          onChange={changeCompetence}
        />
        <DatePickerContainer>
          <StyledSelect
            className="choose-date"
            classNamePrefix="select"
            defaultValue={filters.viewBy[0]}
            name="choose-date"
            options={filters.viewBy.filter(a => a.value !== viewBy)}
            styles={customStyles}
            onChange={changeViewBy}
          />
          <StyledCalendar
            secondary
            size={17}
            onClick={() => setIsFromDatePickerOpen(true)}
          />
          <StyledDatePicker
            selected={fromDate}
            onChange={setFromDate}
            open={isFromDatePickerOpen}
            onFocus={() => setIsFromDatePickerOpen(true)}
            onClickOutside={() => setIsFromDatePickerOpen(false)}
            className="custom-datepicker__input"
            filterDate={filterDate}
          />
          <StyledPlay
            secondary
            size={20}
            direction="left"
            onClick={() => handleManuallyAddDays('from', -1)}
          />
          <Play
            secondary
            size={20}
            onClick={() => handleManuallyAddDays('from', 1)}
          />
          {viewBy === 'dateRange' && (
            <>
              <StyledDivider direction="vertical" secondary size={30} />
              <StyledCalendar
                secondary
                size={17}
                onClick={() => setIsToDatePickerOpen(true)}
              />
              <StyledDatePicker
                selected={toDate}
                onChange={setToDate}
                open={isToDatePickerOpen}
                onFocus={() => setIsToDatePickerOpen(true)}
                onClickOutside={() => setIsToDatePickerOpen(false)}
                className="custom-datepicker__input"
              />
              <StyledPlay
                secondary
                size={20}
                direction="left"
                onClick={() => handleManuallyAddDays('to', -1)}
              />
              <Play
                secondary
                size={20}
                onClick={() => handleManuallyAddDays('to', 1)}
              />
            </>
          )}
        </DatePickerContainer>
        <ButtonsWrapper>
          <Button classes={buttonClass} variant="contained" style={{ color: '#ffffff', background: '#07487a' }} disableElevation onClick={() => (!createNewForecast && !deleteForecast) && setCreateNewForecast(true)}>CREATE FORECAST</Button>
          <Button classes={buttonClass} variant="contained" style={{ color: '#ffffff', background: '#07487a' }} disableElevation onClick={() => (!deleteForecast && !createNewForecast) && setDeleteForecast(!deleteForecast)}>DELETE FORECAST</Button>
          {createNewForecast && <CreateNewForecastPane setCreateNewForecast={setCreateNewForecast} />}
          {deleteForecast && <DeleteForecastPane setDeleteForecast={setDeleteForecast} />}
        </ButtonsWrapper>
      </FiltersWrapper>

      <HorizontalDivider />

      <ChartsWrapper>
        <LineChart
          chartName="staffingEstimate"
          data={lineChart[viewBy].data}
          interval={viewBy === 'day' ? 2 : 0}
          xDataKey={lineChart[viewBy].xDataKey}
          dataKeys={lineChart[viewBy].dataKeys}
        />
        <BarChart
          chartName="staffingEstimate"
          statName="STAFFING ESTIMATE"
          data={barChart[viewBy].data}
          interval={viewBy === 'day' ? 2 : 0}
          stackId={viewBy === 'dateRange' ? 'a' : null}
          xDataKey={barChart[viewBy].xDataKey}
          dataKeys={barChart[viewBy].dataKeys}
        />
      </ChartsWrapper>

      <TableWrapper>
        <Label>CHANNEL:</Label>
        <StyledSelect
          className="choose-channel"
          classNamePrefix="select"
          defaultValue={filters.channel[0]}
          name="choose-channel"
          options={filters.channel}
          styles={customStyles}
        />
        <ForecastingTable tableData={tableData[viewBy]} />
      </TableWrapper>
    </>
  )
};
