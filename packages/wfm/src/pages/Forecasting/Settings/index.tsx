import * as React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import SliderInput from '@cx/components/Slider'
import { countries } from '../fakeData';

const Wrapper = styled.div`
  margin: 20px;
  padding: 20px;
  font-size: 12px;
`;

const SettingHeader = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Divider = styled.div`
  border-bottom: 1px solid #80808096;
`;

const FilterName = styled.span`
  font-size: inherit;
`;

const StyledSelect = styled(Select)`
  display: inline-block;
  margin-left: 120px;
  width: 200px;
  border-color: #07487a;
  position: absolute !important;
`;

const SelectCountryWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  align-items: center; 
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
    menuPaper: {
        maxHeight: 100
    }
};

export function ForecastingSettings() {
    const [country, setCountry] = React.useState('selectCountry');
    return (
        <>
            <Wrapper>
                <SliderInput />
            </Wrapper>
            <Divider />
            <Wrapper>
                <SettingHeader>HOLIDAYS</SettingHeader>
                <SelectCountryWrapper>
                    <FilterName>Select Country</FilterName>
                    <StyledSelect
                        className="choose-country"
                        classNamePrefix="select"
                        defaultValue={countries[0]}
                        name="choose-competence"
                        options={countries.filter(a => a.value !== country && a.value !== 'selectCountry')}
                        styles={customStyles}
                        onChange={({ value }: any) => setCountry(value)}
                    />
                </SelectCountryWrapper>
            </Wrapper>
            <Divider />
        </>
    )
};
