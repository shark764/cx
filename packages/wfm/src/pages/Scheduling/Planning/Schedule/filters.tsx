import * as React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const BoxDiv = styled.div`
  border: 1px solid #80808096;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  /* height: 80px; */
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
  grid-template-columns: 300px 300px;
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

  return (
    <BoxDiv>
      <Title> Feb 11 2021 - Feb 17 2021 </Title>
      <FilterSections>
        <LeftSideFilters>
          <span>
            <Label> Time Span </Label>
            <SelectSized
              className="choose-date-range"
              classNamePrefix="select"
              defaultValue={dateOptions[1]}
              name="choose-date-range"
              options={dateOptions}
              styles={customStyles}
            />
          </span>
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
