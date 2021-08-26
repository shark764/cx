import { useState } from 'react';
import styled from 'styled-components';
import Note from '@material-ui/icons/NoteAdd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useActivities } from '../../Planning/Queries/planningApiQueries';
import { FormDialog } from '@cx/components/FormDialog';
import { DynamicForm } from '@cx/components/DynamicForm';
import { activityCategories, createActivityFormDefenition } from '../../Planning/Forms/CreateActivityFormDefenition';
import { wfm } from '../../../../api';
import { DataGrid } from '@material-ui/data-grid';

const activityColumns = [
  { editable: true, flex: 1, minWidth: 120, field: 'name', headerName: 'Name'},
  { editable: true, flex: 1, minWidth: 120, field: 'paid', headerName: 'Paid', type: 'boolean'},
  { editable: true, flex: 1, minWidth: 120, field: 'category', headerName: 'Category', type: 'singleSelect', valueOptions: activityCategories},
  { editable: true, flex: 1, minWidth: 120, field: 'disabled', headerName: 'Disabled', type: 'boolean'},
  // TODO: in mocks but not API
  // { editable: true, flex: 1, minWidth: 120, field: 'color', headerName: 'Color'},
  // { editable: true, flex: 1, minWidth: 120, field: 'state', headerName: 'Presence State'},
];

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
  height: 500px;
`;
const Create = styled(Note)`
  margin-left: 10px;
  vertical-align: text-top;
  margin-top: 3px;
  font-size: 20px;
  color: #4c4a4a;
  color: #4c4a4a;
  cursor: pointer;
  float: right;
`;

export function ActivityManagement() {
  const [createNewActivity, setCreateNewActivity] = useState(false);

  const tenant_id = useSelector((state: RootState) => state.main.session.tenant_id);
  const {
    data: activities = [],
    refetch: refetchActivities,
    isFetching: activitiesFetching
  } = useActivities(tenant_id);

  return <>
      <TableWrapper>
        <Title> Activities </Title>
        <Create onClick={() => setCreateNewActivity(true)} />

        <TableSpacer>
          <DataGrid
            rows={activities}
            columns={activityColumns}
            density={'compact'}
            autoPageSize
            hideFooterSelectedRowCount
            loading={activitiesFetching}
            onCellEditCommit={({id: activity_id, field, value}) => {

              const editedRowIndex = activities.findIndex(({id}: any) => activity_id === id );

              const { name = null, paid = null, category = null, disabled = null } = activities[editedRowIndex];

              const body = {name, paid, category, disabled, [field]: value };

              wfm.planning.api.patch_tenants_tenant_id_wfm_activities_activity_id({
                pathParams: { tenant_id, activity_id },
                body,
              })
              .then(({name,id}: any) => {
               // refetchActivities();

              }).catch((err: any) => {

              });

            }}
          />
        </TableSpacer>
      </TableWrapper>

      <FormDialog open={createNewActivity} title='Create New Plan' close={() => setCreateNewActivity(false)} >
        <DynamicForm
          defaultValues={{}}
          formDefenition={createActivityFormDefenition}
          onCancel={() => setCreateNewActivity(false)}
          onSubmit={({name, category, paid}: any) => {
            setCreateNewActivity(false);

            wfm.planning.api.post_tenants_tenant_id_wfm_activities({
              pathParams: { tenant_id },
              body: {name, category: category.value, paid: Boolean(paid), disabled: false},
            })
            .then(({name,id}: any) => {
              refetchActivities();
            });
          }}
          isFormSubmitting={false}
          externalFormError={ () => [] }
        ></DynamicForm>
      </FormDialog>
    </>;
}
