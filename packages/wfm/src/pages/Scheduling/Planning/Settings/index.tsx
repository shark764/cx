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
import { usePlans, usePeriods } from '../Queries/planningApiQueries';
import { FormDialog } from '@cx/components/FormDialog';
import { DynamicForm } from '@cx/components/DynamicForm';
import { createPlanFormDefenition } from '../Forms/CreatePlanFormDefenition';
import { createPeriodFormDefenition } from '../Forms/CreatePeriodFormDefenition';
import { wfm } from '../../../../api';
import { planning } from '../../../../redux/reducers/planning';
import { getDiffInDaysFn } from '@cx/utilities/date';
const { setPlan } = planning.actions;


const SheduleControls = styled.section`
  display: flex;
  justify-content: space-between;
`;
const SheduleFilters = styled.section`
  margin-top: 30px;
`;
const PeriodsTable = styled.section`
  margin-top: 30px;
`;
const Actions = styled.span`
  button {
    margin-left: 10px;
  }
`;

export function Settings() {
  const [createNewPlan, setCreateNewPlan] = useState(false);
  const [createNewPeriod, setCreateNewPeriod] = useState(false);
  const tenant_id = useSelector((state: RootState) => state.main.session.tenant_id);
  const dispatch = useDispatch();
  const {
    data: plans = [],
    // isFetching: plansFetching,
    refetch: refetchPlans
  } = usePlans(tenant_id);
  const {
    data: periods = [],
    // isFetching: plansFetching,
    refetch: refetchPeriods
  } = usePeriods(tenant_id);

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
          <Button
            onClick={() => setCreateNewPeriod(true)}
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

      <PeriodsTable>
        {periods.map(({name, startDate, endDate}: any, index: any) => <span key={index}>
          {name} {startDate} {endDate} { getDiffInDaysFn(startDate, endDate) + 1 }
        </span>)}
      </PeriodsTable>

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

      <FormDialog open={createNewPeriod} title='Create Schedule Period' close={() => setCreateNewPeriod(false)} >
        <DynamicForm
          defaultValues={{}}
          formDefenition={createPeriodFormDefenition}
          onCancel={() => setCreateNewPeriod(false)}
          onSubmit={({name, shedulePeriods}: any) => {
            setCreateNewPeriod(false);
            const { startDate, endDate } = shedulePeriods[0];
            wfm.planning.api.post_tenants_tenant_id_wfm_scheduleperiods({
              pathParams: { tenant_id },
              body: {name, startDate: startDate.toISODate(), endDate: endDate.toISODate()},
            })
            .then(() => {
              refetchPeriods();
            });
          }}
          isFormSubmitting={false}
          externalFormError={ () => [] }
        ></DynamicForm>
      </FormDialog>
    </>;
}
