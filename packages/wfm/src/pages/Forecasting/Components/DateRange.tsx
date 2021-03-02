import * as React from 'react';
import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { CloseIcon } from '@cx/components/Icons/Close';
import { Calendar } from '@cx/components/Icons/Calendar';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { Divider } from '@cx/components/Divider';
import { addDays } from '@cx/utilities/date';
import { WarningIcon } from '@cx/components/Icons/WarningIcon';

const HeadingWrapper = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  font-size: 14px;
  border-bottom: 1px solid #80808096;
  justify-content: space-between;
`;

const PaneHeader = styled.span`
  display: inline-block;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  font-size: 12px;
  border-bottom: 1px solid #80808096;
`;

const SettingHeader = styled.span`
  font-weight: 600;
  margin: 3px 0;
`;

const Label = styled.span`
  width: 150px;
`;

const DatePickerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  width: 120px;
  align-items: center;
  border: 1px solid #80808096;
  justify-content: center;
  .react-datepicker__input-container .custom-datepicker__input {
    border: none;
    width: 100%;
    padding: 2px 10px;
    line-height: 28px;
    &:focus {
        border: none;
        border-radius: none;
        box-shadow: none;
    }
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const useTextFieldStyles = makeStyles({
    root: {
        border: '1px solid #80808096',
        flexGrow: 1,
    },
});

interface DateRangeProps {
    paneHeader?: string;
    setForecastCreateDeletePane?: any;
    isCreatingForecast?: boolean;
}

const OverlapTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

export function DateRangeComponent({ setForecastCreateDeletePane, paneHeader, isCreatingForecast }: DateRangeProps) {

    const TextFieldClasses = useTextFieldStyles();
    const TextFieldClass = {
        root: TextFieldClasses.root,
    };
    const theme: any = useTheme();

    const [fromDate, setFromDate] = useState(new Date());
    const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
    const [toDate, setToDate] = useState(new Date());
    const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);
    const [noOfWeeks, setNoOfWeeks] = useState('');

    const upateNoOfWeeks = (e: any) => {
        setNoOfWeeks(e.target.value);
        setToDate((currentDate) => addDays(currentDate, e.target.value * 7));
    };

    return (
        <>
            <HeadingWrapper>
                <PaneHeader>{paneHeader}</PaneHeader>
                <CloseIcon size={15} fill={theme.colors.secondary} onClick={() => setForecastCreateDeletePane(false)} />
            </HeadingWrapper>
            <Wrapper className="date-range-wrapper">
                <SettingHeader>DATE RANGE</SettingHeader>
                <ItemWrapper>
                    <Label>FROM</Label>
                    <DatePickerContainer>
                        <DatePicker
                            selected={fromDate}
                            onChange={setFromDate}
                            open={isFromDatePickerOpen}
                            onFocus={() => setIsFromDatePickerOpen(true)}
                            onClickOutside={() => setIsFromDatePickerOpen(false)}
                            className="custom-datepicker__input"
                        />
                        <Divider direction="vertical" secondary size={30} />
                        <Calendar
                            fill={theme.colors.secondary}
                            size={17}
                            onClick={() => setIsFromDatePickerOpen(true)}
                        />
                    </DatePickerContainer>
                </ItemWrapper>
                <ItemWrapper>
                    <Label>NUMBER OF WEEKS</Label>
                    <TextField id="number" type="number" value={noOfWeeks} onChange={upateNoOfWeeks} classes={TextFieldClass} />
                </ItemWrapper>
                <ItemWrapper>
                    <Label style={{ color: 'grey' }}>TO</Label>
                    <DatePickerContainer>
                        <DatePicker
                            disabled
                            selected={toDate}
                            onChange={setToDate}
                            open={isToDatePickerOpen}
                            onFocus={() => setIsToDatePickerOpen(true)}
                            onClickOutside={() => setIsToDatePickerOpen(false)}
                            className="custom-datepicker__input"
                        />
                        <Divider direction="vertical" secondary size={30} />
                        <Calendar
                            fill={theme.colors.secondary}
                            size={17}
                            onClick={() => setIsToDatePickerOpen(true)}
                        />
                    </DatePickerContainer>
                </ItemWrapper>
                {isCreatingForecast && (fromDate && fromDate.toString().toUpperCase().includes('MAR 01') && noOfWeeks === '1') && (
                    <ItemWrapper>
                        <WarningIcon />
                        <OverlapTextWrapper>
                            <span>Selected dates overlap existing forecast.</span>
                            <span>Existing forecast will be overwritten.</span>
                        </OverlapTextWrapper>
                    </ItemWrapper>
                )}
            </Wrapper>
        </>
    )
};
