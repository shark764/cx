import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import styled from 'styled-components';
import Select from 'react-select';

import { DateRange } from '@cx/components/DateRange'
import { reactSelectStyles } from '@cx/components/reactSelectStyles';
import { planning } from '../../../../redux/reducers/planning';

const BoxDiv = styled.div`
  border: 1px solid #80808096;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  background: white;
`;

const competenceOptions = [{ label: 'Booking', id: 23425 }];

const FilterSections = styled.div`
  display: grid;
  grid-template-columns: fit-content(650px) 1fr 270px;
  grid-gap: 20px;
  align-items: center;
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

const timeZonesOptions = [
  { label: 'America/Chigago', id: 23425 },
  { label: 'Canada/Halifax', id: 4564576 },
];

export function Filters() {

  const start = useSelector((state: RootState) => state.planning.startDate);
  const end = useSelector((state: RootState) => state.planning.endDate);

  const dispatch = useDispatch();
  const {
    setStartDate,
    setEndDate,
    setTimezone,
    setCompetence
  } = planning.actions;

  const handleDatesChanged = (dates: any) => { dispatch(setStartDate(dates[0] || '')) };
  const handleTimezoneChanged = (timezone: any) => { dispatch(setTimezone(timezone) )};
  const handleCompetenceChanged = (competence: any) => { dispatch(setCompetence(competence)) };

  return (
    <BoxDiv>
      <Title> Forecasting filters </Title>
      <FilterSections>

          <DateRange
            startDateTime={start}
            endDateTime={end}
            combinedOnchanges={(data: any) => handleDatesChanged(data)}
          />

          <span>
            <Label> Time Zone </Label>
            <SelectSized
              className="choose_time_zone"
              classNamePrefix="select"
              defaultValue={timeZonesOptions[0]}
              name="choose_time_zone"
              options={timeZonesOptions}
              styles={reactSelectStyles}
              onChange={ (data: any) => handleTimezoneChanged(data)}
            />
          </span>

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