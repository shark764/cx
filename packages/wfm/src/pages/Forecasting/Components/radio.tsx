import * as React from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';

const Wrapper = styled.div`
  flex-grow: 0.5;
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

interface RadioProps {
    isChecked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    value: string;
    label: string
};

export function RadioFilter({ isChecked, onChange, value, label }: RadioProps) {
    return (
        <Wrapper>
            <Radio checked={isChecked} onChange={onChange} value={value} />
            <label>{label}</label>
        </Wrapper>
    )
};
