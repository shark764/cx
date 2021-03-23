import * as React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Select from 'react-select';
import { DateTime } from 'luxon';
import { DateRange } from '@cx/components/DateRange'
import { reactSelectStyles } from '@cx/components/reactSelectStyles';
import { forecasting } from '../../redux/reducers/forecasting';

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

  const dispatch = useDispatch();
  const {
    setStartDate,
    setEndDate,
    setCompetence
  } = forecasting.actions;

  const handleDatesChanged = (dates: any) => {

    const formated = new Date(dates[0]).toISOString() ;
    // TODO: the initial day should start at zero hour... instead of date.now like it currently is..
    // easier probably when creating initial state..  start with day..  start of today to endDate end of same say..

    // TODO: when use goes back to 1 day view..  make sure to convert the second date to the end of same day...

    // TODO: also notice that changing days does not reset the time stamp portion :(
    dispatch(setStartDate(formated || ''))

  };
  const handleCompetenceChanged = (competence: any) => { dispatch(setCompetence(competence)) };

  return (
    <BoxDiv>
      <Title> Forecasting filters </Title>
      <FilterSections>

          <DateRange combinedOnchanges={(data: any) => handleDatesChanged(data)} />

          <span>
            <Label> Competence </Label>
            <SelectSized
              className="choose_competence"
              classNamePrefix="select"
              defaultValue={competenceOptions[0]}
              name="choose_competence"
              options={competenceOptions}
              styles={reactSelectStyles}
              onChange={ (data: any) => handleCompetenceChanged(data)}
            />
          </span>

      </FilterSections>
    </BoxDiv>
  );
}
