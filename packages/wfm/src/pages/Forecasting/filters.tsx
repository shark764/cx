import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styled from 'styled-components';
import Select from 'react-select';
import { DateRange } from '@cx/components/DateRange';
import { DateTime } from 'luxon';
import { reactSelectStyles } from '@cx/components/reactSelectStyles';
import { forecasting } from '../../redux/reducers/forecasting';
import { parseDateToISODate, convertJSDateToUTC } from '@cx/utilities/date';

const BoxDiv = styled.div`
  border: 1px solid #80808096;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  background: white;
`;

const competenceOptions = [{ label: 'Booking', id: 23425 }];

const FilterSections = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SelectSized = styled(Select)`
  width: 250px;
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

export function Filters() {

  const forecastingStartDate = useSelector((state: RootState) => state.forecasting.historicalQueryParams.startDateTime);
  const startOfStartDate = DateTime.fromISO(forecastingStartDate, { setZone: true }).startOf('day').toISO();
  const formattedStartDate = convertJSDateToUTC(new Date(startOfStartDate));

  const dispatch = useDispatch();
  const {
    setCompetence,
    setStartDate,
    setEndDate
  } = forecasting.actions;

  const handleDatesChanged = (dates: any) => {
    dispatch(setStartDate(parseDateToISODate(dates[0], 'startOfDay') || ''));
    dispatch(setEndDate(parseDateToISODate(dates[1], 'endOfDay') || ''));
  };
  const handleCompetenceChanged = (competence: any) => { dispatch(setCompetence(competence)) };

  return (
    <BoxDiv>
      <Title> Forecasting filters </Title>
      <FilterSections>

        <DateRange startDateTime={formattedStartDate} combinedOnchanges={(data: any) => handleDatesChanged(data)} />

        <span>
          <Label> Competence </Label>
          <SelectSized
            className="choose_competence"
            classNamePrefix="select"
            defaultValue={competenceOptions[0]}
            name="choose_competence"
            options={competenceOptions}
            styles={reactSelectStyles}
            onChange={(data: any) => handleCompetenceChanged(data)}
          />
        </span>

      </FilterSections>
    </BoxDiv>
  );
}
