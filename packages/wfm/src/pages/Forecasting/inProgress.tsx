import * as React from 'react';
import styled from 'styled-components';
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { useQuery } from 'react-query';
import { wfm } from '../../api';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';
import { Ellipsis } from '@cx/components/Icons/Ellipsis';
import { Insights } from '@cx/components/Icons/Insights';
import { forecasting } from '../../redux/reducers/forecasting';
import Zoom from '@material-ui/core/Zoom';
import Arrow from '@material-ui/icons/ArrowRightAlt';
import { CloseIcon } from '@cx/components/Icons/Close';

const {
  setScenarioInProgress,
  setStartDate,
  setEndDate
} = forecasting.actions;

const Container = styled.div`
  padding: 20px;
  display: grid;
  align-items: self-end;
  grid-template-columns: 1fr 35px 20px;
  grid-gap: 20px;
`;
const InsightsContainer = styled.div`
  &:hover {
    svg {
      opacity: .5;
    }
  }
`;

const useStylesBootstrap = makeStyles(() => ({
  arrow: {
    color: 'white',
  },
  tooltip: {
    backgroundColor: 'white',
    boxShadow: '0px 1px 3px 0px grey',
    color: 'black',
    maxWidth: 500,
    fontSize: '16px',
    fontWeight: 'bold',
  },
}));

interface Props {
  selectedTimeline: string;
};

export const InProgress: React.FC<Props> = ({ selectedTimeline }) => {

  const classes = useStylesBootstrap();

  const dispatch = useDispatch();
  const tenant_id = useSelector((state: RootState) => state.main.session.tenant_id);
  const { startDate, endDate, forecast_scenario_id } = useSelector((state: RootState) => state.forecasting.scenarioInProgress);

  const { data: generatedForecasts } = useQuery<any, any>(
    ['timelinesData', tenant_id, forecast_scenario_id],
    () => forecast_scenario_id && wfm.forecasting.api.get_all_wfm_forecastscenarios_scenario_id_series({
      pathParams: { tenant_id, scenario_id: forecast_scenario_id },
    }),
    {
      refetchInterval: 15000,
    }
  );

  const [status] = useMemo(() => {
    const anyNotFinished = generatedForecasts?.data?.some(({ status }: any) => status !== 'success') || generatedForecasts?.data?.length === 0;
    return [anyNotFinished];
  }, [generatedForecasts]);

  const showSpecificSenarioRange = (start: string, end: string) => {
    dispatch(setStartDate(start));
    dispatch(setEndDate(end));
  };


  return <>
    { forecast_scenario_id &&
      <div>
        <Tooltip
          classes={classes}
          TransitionComponent={Zoom}
          arrow
          title={
            <Container>
              <span> {startDate} - {endDate} </span>
              {!status && <>
                <Tooltip title="Go to date range">
                  <span style={{height: '24px'}}>
                    <Arrow
                      style={{ color: 'grey', transform: 'scale(2)', margin: '0 auto', cursor: 'pointer' }}
                      onClick={() => showSpecificSenarioRange(startDate, endDate)}
                    />
                  </span>
                </Tooltip>
                <Tooltip title="Dismiss">
                  <span>
                    <CloseIcon
                      size={10}
                      fill="grey"
                      onClick={() => dispatch(setScenarioInProgress({ startDate: '', endDate: '', forecast_scenario_id: '' }))}
                    />
                  </span>
                </Tooltip>
              </>}
              {status && <>
                <Tooltip title="In Progress">
                  <span style={{ marginBottom: '2px' }}>
                    <Ellipsis width={25} animated />
                  </span>
                </Tooltip>
              </>}
            </Container>
          }
        >
          <InsightsContainer>
            <Insights
              fill="rgb(241, 113, 0)"
              alternateFill="rgb(25, 161, 26)"
              width={40}
              animated={status}
              className="forecast-in-progress"
            />
          </InsightsContainer>
        </Tooltip>
      </div>
    }
  </>;
}