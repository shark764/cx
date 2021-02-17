import * as React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const Wrapper = styled.div`
  margin: 0px 5px;
  flex-grow: 1;
`;

const FilterName = styled.span`
  font-size: inherit;
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
    }
};

interface FilterProps {
    filterTitle: string;
    className: string;
    defaultValue: { label: string, id: number };
    options: { label: string, id: number }[];
};

export const DropdownFilter = ({ filterTitle, className, defaultValue, options }: FilterProps) => (
    <Wrapper>
        <FilterName>{filterTitle}</FilterName>
        <Select
            className={className}
            classNamePrefix="select"
            defaultValue={defaultValue}
            name={className}
            options={options}
            styles={customStyles}
        />
    </Wrapper>
);
