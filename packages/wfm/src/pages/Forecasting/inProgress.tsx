import * as React from 'react';
import styled from 'styled-components';
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { useQuery } from 'react-query';
import { wfm } from '../../api';
import Tooltip, { tooltipClasses } from '@material-ui/core/Tooltip';
import { Ellipsis } from '@cx/components/Icons/Ellipsis';
import { Insights } from '@cx/components/Icons/Insights';
import { forecasting } from '../../redux/reducers/forecasting';
import Zoom from '@material-ui/core/Zoom';
import Arrow from '@material-ui/icons/ArrowRightAlt';
import { CloseIcon } from '@cx/components/Icons/Close';
import { DateTime } from 'luxon';

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

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'black',
    boxShadow: '0px 1px 3px 0px grey',
    fontSize: '16px',
    fontWeight: 'bold',
    maxWidth: 500,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'white',
  },
}));
interface Props {
  selectedTimeline: string;
};

export const InProgress: React.FC<Props> = ({ selectedTimeline }) => {

  const dispatch = useDispatch();
  const tenant_id = useSelector((state: RootState) => state.main.session.tenant_id);
  const { startDate, endDate, forecast_scenario_id } = useSelector((state: RootState) => state.forecasting.scenarioInProgress);
  const [insightStatus, setInsightStatus] = React.useState('');

  const { data: generatedForecasts } = useQuery<any, any>(
    ['timelinesData', tenant_id, forecast_scenario_id],
    () => forecast_scenario_id && wfm.forecasting.api.get_all_tenants_tenant_id_wfm_forecastscenarios_scenario_id_series({
      pathParams: { tenant_id, scenario_id: forecast_scenario_id },
    }),
    {
      refetchInterval: 2000,
    }
  );

  const [animatedStatus] = useMemo(() => {
    const anyNotFinished = (generatedForecasts?.length > 0 && generatedForecasts?.some(({ status }: any) => status !== 'success'))
      || generatedForecasts?.length === 0;
    if (generatedForecasts?.length === 0) { // unknow status
      setInsightStatus('started');
    } else if (generatedForecasts?.length > 0) {
      if (generatedForecasts?.some(({ status }: any) => status === 'running')) { // running status
        setInsightStatus('running');
      } else if (generatedForecasts?.some(({ status }: any) => status === 'pending')) { // pending status
        setInsightStatus('pending');
      } else if (generatedForecasts?.some(({ status }: any) => status === 'success')) { // success status
        setInsightStatus('success');
      } else {
        setInsightStatus('error'); // error status
      }
    }
    return [anyNotFinished];
  }, [generatedForecasts]);

  const showSpecificSenarioRange = (start: string, end: string) => {
    dispatch(setStartDate(start));
    dispatch(setEndDate(end));
  };

  const formatDate = (date: any) => DateTime.fromISO(date).toFormat('yyyy-LL-dd');

  return <>
    {forecast_scenario_id &&
      <div>
        <LightTooltip
          TransitionComponent={Zoom}
          arrow
          title={
            <Container>
              {<span> {formatDate(startDate)} - {formatDate(endDate)} </span>}
              {!animatedStatus && insightStatus === 'success' && <>
                <Tooltip title="Go to date range">
                  <span style={{ height: '24px' }}>
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
              {(animatedStatus || insightStatus !== 'success') && <>
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
              width={40}
              animated={animatedStatus}
              status={insightStatus}
              className="forecast-in-progress"
            />
          </InsightsContainer>
        </LightTooltip>
      </div>
    }
  </>;
}