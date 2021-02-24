import * as React from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

interface RadioProps {
    isChecked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    value: string;
    label?: string
};

export function RadioButton({ isChecked, onChange, value, label }: RadioProps) {
    return (
        <Wrapper>
            <Radio checked={isChecked} onChange={onChange} value={value} color="default" size="small" />
            {label && <label>{label}</label>}
        </Wrapper>
    )
};
