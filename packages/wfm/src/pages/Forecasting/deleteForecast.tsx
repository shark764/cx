import * as React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

import { DateRangeComponent } from './Components/DateRange';
import Button from '@material-ui/core/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  min-width: 450px;
  margin-top: 20px;
  z-index: 1;
  background-color: white;
  border: 3px solid #80808096;
`;

const StyledDateRange = styled(DateRangeComponent)`
  .date-range-wrapper {
    border: none;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin: 30px;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
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

export function DeleteForecastPane({ setDeleteForecast }: { setDeleteForecast: any }) {
    const classes = useStyles();
    const buttonClass = {
        root: classes.root,
    };
    return (
        <Container>
            <StyledDateRange paneHeader="DELETE FORECAST" setForecastCreateDeletePane={setDeleteForecast} />
            <ButtonsWrapper>
                <Button classes={buttonClass} variant="contained" style={{ background: 'white', border: '1px solid #80808096' }} disableElevation onClick={() => setDeleteForecast(false)}>CANCEL</Button>
                <Button classes={buttonClass} variant="contained" style={{ color: '#ffffff', background: '#07487a' }} disableElevation onClick={() => ''}>OK</Button>
            </ButtonsWrapper>
        </Container>
    )
};
