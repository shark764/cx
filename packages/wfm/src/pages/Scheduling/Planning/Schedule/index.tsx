import * as React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import { ScheduleVersion } from './chooseVersion';
import { Filters } from './filters';
import { SheduleTable } from './table';

const useStyles = makeStyles({
  root: {
    height: 40,
    padding: '0 30px',
    marginLeft: '30px',
    // textTransform: 'capitalize',
  },
});

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

export function PlanningSchedule() {
  const classes = useStyles();

  const buttonClass = {
    root: classes.root,
  };
  return (
    <>
      <SheduleControls>
        <ScheduleVersion />
        <span>
          <Button classes={buttonClass} style={{ color: '#4c4a4a' }} variant="outlined" startIcon={<FileCopyIcon />}>
            Copy Shedule
          </Button>
          {/* Have only one lock button.. and dynamic if shedule is locked or not */}
          <Button classes={buttonClass} style={{ color: '#4c4a4a' }} variant="outlined" startIcon={<LockIcon />}>
            Lock Shedule
          </Button>

          <Button classes={buttonClass} style={{ color: '#4c4a4a' }} variant="outlined" startIcon={<RefreshIcon />}>
            Refresh
          </Button>
          <Button
            classes={buttonClass}
            style={{ color: 'white', background: '#07487a' }}
            variant="contained"
            disableElevation
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </span>
      </SheduleControls>

      <SheduleFilters>
        <Filters />
      </SheduleFilters>

      <SheduleTableSection>
        <SheduleTable />
      </SheduleTableSection>
    </>
  );
}
