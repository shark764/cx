import * as React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DateTime } from 'luxon';
import { DateRange } from '@cx/components/DateRange';
import { forecasting } from '../../redux/reducers/forecasting';

const BoxDiv = styled.div`
  border: 1px solid #80808096;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  background: white;
`;

const FilterSections = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const Title = styled.h4`
  color: grey;
  font-style: italic;
  margin-top: 0px;
  margin-left: 10px;
  margin-bottom: 25px;
`;

export function Filters() {

  const forecastingStartDate = useSelector((state: RootState) => state.forecasting.historicalQueryParams.startDateTime);
  const forecastingEndDate = useSelector((state: RootState) => state.forecasting.historicalQueryParams.endDateTime);

  const selectedCompetence = useSelector((state: RootState) => state.forecasting.competence);

  const competenceOptions = useSelector((state: RootState) =>
    state.main.competencies.map(({ id, name, type }) => ({ label: name, id }))
  );

  const dispatch = useDispatch();
  const {
    setCompetence,
    setStartDate,
    setEndDate
  } = forecasting.actions;

  const handleDatesChanged = (dates: [Date, Date]) => {
    const formatDate = (date: any) => DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');
    if (dates[0]) {
      dispatch(setStartDate(formatDate(dates[0])));
    }
    if (dates[1]) {
      dispatch(setEndDate(formatDate(dates[1])));
    }
  };

  const handleCompetenceChanged = (competenceId: any) => { dispatch(setCompetence(competenceId)) };

  return (
    <BoxDiv>
      <Title> Forecasting filters </Title>
      <FilterSections>

        <DateRange
          startDateTime={forecastingStartDate}
          endDateTime={forecastingEndDate}
          combinedOnchanges={(data: any) => handleDatesChanged(data)}
        />

        <span>
          <TextField
            id="outlined-select-currency"
            select
            label="Competency"
            value={selectedCompetence}
            onChange={({target: { value }}: any) => handleCompetenceChanged(value)}
            variant="outlined"
            style={{ width: '200px' }}
            size="small"
          >
            {competenceOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </span>

      </FilterSections>
    </BoxDiv>
  );
}
