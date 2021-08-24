import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector } from 'react-redux';
import { ScheduleVersion } from './ScheduleVersion';
import { Filters } from './filters';
import { SheduleTable } from './table';
import { RootState } from '../../../../redux/store';
import { usePlans } from '../Queries/planningApiQueries';

const SheduleControls = styled.section`
  display: flex;
  justify-content: space-between;
`;
const SheduleFilters = styled.section`
  margin-top: 30px;
`;
const SheduleTableSection = styled.section`
  margin-top: 30px;
`;
const Actions = styled.span`
  button {
    margin-left: 10px;
  }
`;

export function PlanningSchedule() {
  const sessionTenantId = useSelector((state: RootState) => state.main.session.tenant_id);

  const {
    data: plans = [],
    // isFetching: plansFetching,
    // refetch: refetchPlans
  } = usePlans(sessionTenantId);

  return <>
      <SheduleControls>
        <ScheduleVersion
          plans={plans}
        />
        <Actions>
          <Button // Copy
            style={{ color: '#4c4a4a' }}
            variant="outlined"
            startIcon={<FileCopyIcon />}
          >
            Copy Shedule
          </Button>
          <Button // Lock
            style={{ color: '#4c4a4a' }}
            variant="outlined"
            startIcon={<LockIcon />}
          >
            Lock Shedule
          </Button>
          <Button // Refresh
            style={{ color: '#4c4a4a' }}
            variant="outlined"
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
          <Button // Save
            variant="contained"
            disableElevation
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Actions>
      </SheduleControls>

      <SheduleFilters>
        <Filters />
      </SheduleFilters>

      <SheduleTableSection>
        <SheduleTable />
      </SheduleTableSection>
    </>;
}
