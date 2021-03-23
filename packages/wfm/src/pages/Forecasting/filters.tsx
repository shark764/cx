import * as React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import { DateRange } from '@cx/components/DateRange'
import { reactSelectStyles } from '@cx/components/reactSelectStyles';

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

  return (
    <BoxDiv>
      <Title> Forecasting filters </Title>
      <FilterSections>

          <DateRange />

          <span>
            <Label> Competence </Label>
            <SelectSized
              className="choose_competence"
              classNamePrefix="select"
              defaultValue={competenceOptions[0]}
              name="choose_competence"
              options={competenceOptions}
              styles={reactSelectStyles}
            />
          </span>

      </FilterSections>
    </BoxDiv>
  );
}
