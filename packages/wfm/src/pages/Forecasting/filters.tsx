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
  const forecastingEndDate = useSelector((state: RootState) => state.forecasting.historicalQueryParams.endDateTime);

  const selectedCompetence = useSelector((state: RootState) => state.forecasting.competence);

  const competenceOptions = useSelector((state: RootState) =>
    state.main.competencies.map(({id, name, type}) => ({label: name, id}))
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
  const handleCompetenceChanged = (competence: any) => { dispatch(setCompetence(competence)) };

  const defaultValue = competenceOptions.find(({id}) => id === selectedCompetence)

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
          <Label> Competence </Label>
          <SelectSized
            className="choose_competence"
            classNamePrefix="select"
            value={defaultValue}
            options={competenceOptions}
            styles={reactSelectStyles}
            onChange={(data: any) => handleCompetenceChanged(data.id)}
          />
        </span>

      </FilterSections>
    </BoxDiv>
  );
}
