import { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
// import LockIcon from '@material-ui/icons/Lock';
// import FileCopyIcon from '@material-ui/icons/FileCopy';
// import RefreshIcon from '@material-ui/icons/Refresh';
// import SaveIcon from '@material-ui/icons/Save';
import { useSelector, useDispatch } from 'react-redux';
import { ScheduleVersion } from '../Schedule/ScheduleVersion';
import Note from '@material-ui/icons/NoteAdd';
// import { Filters } from './filters';
// import { SheduleTable } from './table';
import { RootState } from '../../../../redux/store';
import { usePlans } from '../Schedule/planningApiQueries';
import { FormDialog } from '@cx/components/FormDialog';
import { DynamicForm } from '@cx/components/DynamicForm';
import { createPlanFormDefenition } from '../Schedule/CreatePlanFormDefenition';
import { wfm } from '../../../../api';
import { planning } from '../../../../redux/reducers/planning';
const { setPlan } = planning.actions;


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

export function Settings() {
  const [createNewPlan, setCreateNewPlan] = useState(false);
  const tenant_id = useSelector((state: RootState) => state.main.session.tenant_id);
  const dispatch = useDispatch();
  const {
    data: plans = [],
    // isFetching: plansFetching,
    refetch: refetchPlans
  } = usePlans(tenant_id);

  return <>
      <SheduleControls>
        <ScheduleVersion
          plans={plans}
        />
        <Actions>
          <Button
            style={{ color: '#4c4a4a' }}
            onClick={() => setCreateNewPlan(true)}
            variant="outlined"
            color="primary"
            startIcon={<Note />}
          >
            Create Plan
          </Button>
          {/* <Button // Lock
            style={{ color: '#4c4a4a' }}
            variant="outlined"
            startIcon={<LockIcon />}
          >
            Lock Shedule
          </Button> */}
          {/* <Button // Refresh
            style={{ color: '#4c4a4a' }}
            variant="outlined"
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button> */}
          <Button // Save
            variant="contained"
            disableElevation
            color="primary"
            startIcon={<Note />}
          >
            Create Schedule Period
          </Button>
        </Actions>
      </SheduleControls>

      <SheduleFilters>
        {/* <Filters /> */}
      </SheduleFilters>

      <SheduleTableSection>
        {/* <SheduleTable /> */}
      </SheduleTableSection>

      <FormDialog open={createNewPlan} title='Create New Plan' close={() => setCreateNewPlan(false)} >
        <DynamicForm
          defaultValues={{}}
          formDefenition={createPlanFormDefenition}
          onCancel={() => setCreateNewPlan(false)}
          onSubmit={({name, official, deleted}: any) => {
            setCreateNewPlan(false);
            wfm.planning.api.post_tenants_tenant_id_wfm_plans({
              pathParams: { tenant_id },
              body: {name, official: Boolean(official), deleted: Boolean(deleted)},
            })
            .then(({name,id}: any) => {
              refetchPlans().then(() => {
                dispatch(setPlan({label: name, id }));
              });
            });
          }}
          isFormSubmitting={false}
          externalFormError={ () => [] }
        ></DynamicForm>
      </FormDialog>
    </>;
}
