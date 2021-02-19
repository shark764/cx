import * as React from 'react';
import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Calendar } from '@cx/components/Icons/Calendar';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { Divider } from '@cx/components/Divider';
import { TextBox } from '@cx/components/Inputs/TextBox';
import { RadioButton } from './Components/radio';
import { DateRangeComponent } from './Components/DateRange';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  min-width: 450px;
  min-height: 600px;
  margin-top: 20px;
  z-index: 1;
  background-color: white;
  border: 3px solid #80808096;
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

const ButtonsWrapper = styled.div`
  display: flex;
  margin: 30px;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
`;

const StyledInput = styled(TextBox)`
   flex-grow: 1;
   width: 200px !important;
`;

const useStyles = makeStyles({
    root: {
        width: '100px',
        maxWidth: '100px',
        height: 30,
        marginLeft: '10px',
        fontSize: '12px',
        textTransform: 'capitalize',
        flexGrow: 1,
    },
});

export function CreateNewForecastPane({ setCreateNewForecast }: { setCreateNewForecast: any }) {
    const classes = useStyles();
    const buttonClass = {
        root: classes.root,
    };
    const theme: any = useTheme();

    const [historicalFromDate, setHistoricalFromDate] = useState(new Date());
    const [isHistoricalFromDatePickerOpen, setIsHistoricalFromDatePickerOpen] = useState(false);
    const [historicalToDate, setHistoricalToDate] = useState(new Date());
    const [isHistoricalToDatePickerOpen, setIsHistoricalToDatePickerOpen] = useState(false);

    // Radio Buttons State:
    const [day, setDay] = useState('');
    const [intraDay, setIntraDay] = useState('');
    const [trend, setTrend] = useState('');
    const [historicalWeight, setHistoricalWeight] = useState('');
    const [smoothing, setSmoothing] = useState('');

    const [floor, setFloor] = useState('');
    const [cap, setCap] = useState('');

    return (
        <Container>
            <DateRangeComponent paneHeader="FORECAST SETTINGS" setForecastCreateDeletePane={setCreateNewForecast} isCreatingForecast={true} />
            <Wrapper>
                <SettingHeader>HISTORICAL DATE RANGE</SettingHeader>
                <ItemWrapper>
                    <Label>DAY</Label>
                    <RadioButton isChecked={day === 'allHistorical'} onChange={(e) => setDay(e.target.value)} value="allHistorical" label="ALL HISTORICAL" />
                    <RadioButton isChecked={day === 'setRange'} onChange={(e) => setDay(e.target.value)} value="setRange" label="SET RANGE" />
                </ItemWrapper>
                <ItemWrapper>
                    <Label>INTRDAY</Label>
                    <RadioButton isChecked={intraDay === 'allHistorical'} onChange={(e) => setIntraDay(e.target.value)} value="allHistorical" label="ALL HISTORICAL" />
                    <RadioButton isChecked={intraDay === 'setRange'} onChange={(e) => setIntraDay(e.target.value)} value="setRange" label="SET RANGE" />
                </ItemWrapper>
                <ItemWrapper>
                    <Label>FROM</Label>
                    <DatePickerContainer>
                        <DatePicker
                            selected={historicalFromDate}
                            onChange={setHistoricalFromDate}
                            open={isHistoricalFromDatePickerOpen}
                            onFocus={() => setIsHistoricalFromDatePickerOpen(true)}
                            onClickOutside={() => setIsHistoricalFromDatePickerOpen(false)}
                            className="custom-datepicker__input"
                        />
                        <Divider direction="vertical" secondary size={30} />
                        <Calendar
                            fill={theme.colors.secondary}
                            size={17}
                            onClick={() => setIsHistoricalFromDatePickerOpen(true)}
                        />
                    </DatePickerContainer>
                </ItemWrapper>
                <ItemWrapper>
                    <Label>TO</Label>
                    <DatePickerContainer>
                        <DatePicker
                            selected={historicalToDate}
                            onChange={setHistoricalToDate}
                            open={isHistoricalToDatePickerOpen}
                            onFocus={() => setIsHistoricalToDatePickerOpen(true)}
                            onClickOutside={() => setIsHistoricalToDatePickerOpen(false)}
                            className="custom-datepicker__input"
                        />
                        <Divider direction="vertical" secondary size={30} />
                        <Calendar
                            fill={theme.colors.secondary}
                            size={17}
                            onClick={() => setIsHistoricalToDatePickerOpen(true)}
                        />
                    </DatePickerContainer>
                </ItemWrapper>
            </Wrapper>

            <Wrapper>
                <SettingHeader>DAY SETTINGS</SettingHeader>
                <ItemWrapper>
                    <Label>TREND</Label>
                    <RadioButton isChecked={trend === 'linear'} onChange={(e) => setTrend(e.target.value)} value="linear" label="LINEAR" />
                    <RadioButton isChecked={trend === 'logistical'} onChange={(e) => setTrend(e.target.value)} value="logistical" label="LOGISTICAL" />
                </ItemWrapper>
                {trend === 'logistical' && (
                    <>
                        <ItemWrapper>
                            <Label>FLOOR</Label>
                            <StyledInput value={floor} onChange={(event: any) => setFloor(event.target.value)} />
                        </ItemWrapper>
                        <ItemWrapper>
                            <Label>CAP</Label>
                            <StyledInput value={cap} onChange={(event: any) => setCap(event.target.value)} />
                        </ItemWrapper>
                    </>
                )}
            </Wrapper>

            <Wrapper>
                <SettingHeader>INTRADAY SETTINGS</SettingHeader>
                <ItemWrapper>
                    <Label>HISTORICAL WEIGHT</Label>
                    <RadioButton isChecked={historicalWeight === 'even'} onChange={(e) => setHistoricalWeight(e.target.value)} value="even" label="EVEN" />
                    <RadioButton isChecked={historicalWeight === 'exponential'} onChange={(e) => setHistoricalWeight(e.target.value)} value="exponential" label="EXPONENTIAL" />
                </ItemWrapper>
                <ItemWrapper>
                    <Label>SMOOTHING</Label>
                    <RadioButton isChecked={smoothing === 'smoothing'} onChange={(e) => setSmoothing(e.target.value)} value="smoothing" />
                </ItemWrapper>
            </Wrapper>

            <ButtonsWrapper>
                <Button classes={buttonClass} variant="contained" style={{ background: 'white', border: '1px solid #80808096' }} disableElevation onClick={() => setCreateNewForecast(false)}>CANCEL</Button>
                <Button classes={buttonClass} variant="contained" style={{ color: '#ffffff', background: '#07487a' }} disableElevation onClick={() => ''}>OK</Button>
            </ButtonsWrapper>
        </Container>
    )
};
