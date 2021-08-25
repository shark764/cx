import { useState } from 'react';
import styled from 'styled-components';
import Note from '@material-ui/icons/NoteAdd';
import { useSelector, useDispatch } from 'react-redux';
import { ScheduleVersion } from '../Schedule/ScheduleVersion';
import { RootState } from '../../../../redux/store';
import { usePlans, usePeriods, useBreakSettings } from '../Queries/planningApiQueries';
import { FormDialog } from '@cx/components/FormDialog';
import { DynamicForm } from '@cx/components/DynamicForm';
import { createPlanFormDefenition } from '../Forms/CreatePlanFormDefenition';
import { createPeriodFormDefenition } from '../Forms/CreatePeriodFormDefenition';
import { createBreakSettingsFormDefenition } from '../Forms/CreateBreakSettingsFormDefenition';
import { wfm } from '../../../../api';
import { planning } from '../../../../redux/reducers/planning';
import { DataGrid } from '@material-ui/data-grid';
const { setPlan } = planning.actions;

const breakSettingsColumns = [
  { editable: true, width: 180, field: 'shiftStartMin', headerName: 'Shift Start Min' },
  { editable: true, width: 180, field: 'shiftStartMax', headerName: 'Shift Start Max'},
  { editable: true, width: 160, field: 'shiftLengthMin', headerName: 'Min Length', type: 'number'},
  { editable: true, width: 160, field: 'shiftLengthMax', headerName: 'Max Length', type: 'number'},
  { editable: true, width: 200, field: 'timeBetweenBreaksMin', headerName: 'Min time between breaks', type: 'number'},
  // TODO: breaks
  // TODO: dayTypes
];
const periodColumns = [
  { editable: true, width: 180, field: 'name', headerName: 'Name' },
  { editable: true, width: 180, field: 'startDate', headerName: 'Start Date'},
  { editable: true, width: 160, field: 'endDate', headerName: 'End Date', type: 'number'},
  { editable: false, width: 160, field: 'days', headerName: 'Days', type: 'number'},
];


const SheduleControls = styled.section`
  display: flex;
  justify-content: space-between;
`;
const Actions = styled.span`
  button {
    margin-left: 10px;
  }
`;
const TableWrapper = styled.div`
  margin-top: 20px;
  background: white;
  border: 1px solid #80808096;
  padding: 10px;
  border-radius: 5px;
`;
const Title = styled.h4`
  display: inline-block;
  color: grey;
  font-style: italic;
  margin-top: 0px;
  margin-left: 10px;
`;
const TableSpacer = styled.div`
  margin-top: 40px;
  height: 300px;
`;
const CreatePlan = styled(Note)`
  margin-left: 10px;
  color: #4c4a4a;
  vertical-align: text-top;
  font-size: 20px;
  margin-top: 3px;
  color: #4c4a4a;
  cursor: pointer;
`;
const CreatePeriod = styled(Note)`
  margin-left: 10px;
  vertical-align: text-top;
  margin-top: 3px;
  font-size: 20px;
  color: #4c4a4a;
  color: #4c4a4a;
  cursor: pointer;
  float: right;
`;

export function Settings() {
  const [createNewPlan, setCreateNewPlan] = useState(false);
  const [createNewPeriod, setCreateNewPeriod] = useState(false);
  const [createNewBreakSetting, setCreateNewBreakSetting] = useState(false);

  const tenant_id = useSelector((state: RootState) => state.main.session.tenant_id);
  const dispatch = useDispatch();
  const {
    data: plans = [],
    refetch: refetchPlans
  } = usePlans(tenant_id);
  const {
    data: periods = [],
    refetch: refetchPeriods
  } = usePeriods(tenant_id);
  const {
    data: breaks = [],
    refetch: refetchBreaks
  } = useBreakSettings(tenant_id);

  return <>
      <SheduleControls>
        <span>
          <ScheduleVersion
            plans={plans}
            width={400}
          />
          <CreatePlan onClick={() => setCreateNewPlan(true)} />
        </span>
        <Actions>
        </Actions>
      </SheduleControls>

      <TableWrapper>
        <Title> Schedule Periods </Title>
        <CreatePeriod onClick={() => setCreateNewPeriod(true)} />

        <TableSpacer>
          <DataGrid
            rows={periods}
            columns={periodColumns}
            density={'compact'}
            onCellEditCommit={(prop) => {
              // make it so you can edit some cells..
              // const newVal = [...value];
              // const editedRow = newVal.findIndex(({id}) => id === prop.id );
              // const newCellValue = {...newVal[editedRow], [prop.field]: prop.value}
              // newVal.splice(editedRow, 1, newCellValue);
              // onChange(newVal);
            }}
          />
        </TableSpacer>
      </TableWrapper>

      <TableWrapper>
        <Title> Break Settings </Title>
        <CreatePeriod onClick={() => setCreateNewBreakSetting(true)} />

        <TableSpacer>
          <DataGrid
            rows={breaks}
            columns={breakSettingsColumns}
            density={'compact'}
            onCellEditCommit={(prop) => {
              // make it so you can edit some cells..
              // const newVal = [...value];
              // const editedRow = newVal.findIndex(({id}) => id === prop.id );
              // const newCellValue = {...newVal[editedRow], [prop.field]: prop.value}
              // newVal.splice(editedRow, 1, newCellValue);
              // onChange(newVal);
            }}
          />
        </TableSpacer>
      </TableWrapper>

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

      <FormDialog open={createNewBreakSetting} title='Create Break Setting' close={() => setCreateNewBreakSetting(false)} >
        <DynamicForm
          defaultValues={{dayTypes: [1,2,3,4,5,6,7], breaks: []}}
          formDefenition={createBreakSettingsFormDefenition}
          onCancel={() => setCreateNewBreakSetting(false)}
          onSubmit={({breaks, dayTypes, ...breakSettings}: any) => {
            setCreateNewBreakSetting(false);

            const withoutBreakIds = breaks.map(({id, ...rest}: any) => ({...rest}));
            const noNullDayTypes = dayTypes.filter(Boolean);

            wfm.planning.api.post_tenants_tenant_id_wfm_breaksettings({
              pathParams: { tenant_id },
              body: { ...breakSettings, breaks: withoutBreakIds, dayTypes: noNullDayTypes },
            })
            .then(() => {
              refetchBreaks();
            });
          }}
          isFormSubmitting={false}
          externalFormError={ () => [] }
        ></DynamicForm>
      </FormDialog>
    </>;
}
