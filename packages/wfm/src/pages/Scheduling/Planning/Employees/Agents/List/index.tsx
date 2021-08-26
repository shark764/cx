import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';
import { useAgents } from '../../../Queries/planningApiQueries';
import { wfm } from '../../../../../../api';
import { DataGrid } from '@material-ui/data-grid';
import { DateTime } from 'luxon';
import { TimeZones } from '../../../../../../timezones';
const timezones = TimeZones.map((val) => ({label: val, value: val }));

const agentColumns = [
  // Native feilds synced from CxEngage
  { hide: false, editable: false, flex: 1, minWidth: 150, field: 'firstName', headerName: 'First Name'},
  { hide: false, editable: false, flex: 1, minWidth: 150, field: 'lastName', headerName: 'Last Name'},
  { hide: false, editable: false, flex: 1, minWidth: 240, field: 'email', headerName: 'Email'},
  { hide: false, editable: false, width: 80, field: 'active', hideSortIcons: true,disableColumnMenu: true, headerName: 'Active', type: 'boolean' },
  { hide: true, editable: false, flex: 1, minWidth: 120, field: 'role', headerName: 'Role'},
  { hide: true, editable: false, flex: 1, minWidth: 120, field: 'externalId', headerName: 'External Id'},
  { hide: true, editable: false, flex: 1, minWidth: 180, field: 'capacityId', headerName: 'Capacity Id'},
  { hide: true, editable: false, flex: 1, minWidth: 200, field: 'tenantId', headerName: 'TenantId'},

  // Fields on agent object specific to WFM api
  { hide: true, editable: false, flex: 1, minWidth: 120, field: 'organization', headerName: 'Organization'}, // TODO: api doesn't seem ready yet
  { hide: false, editable: true, flex: 1, minWidth: 120, field: 'start', headerName: 'Hire Date', type: 'date'},
  { hide: false, editable: true, flex: 1, minWidth: 120, field: 'end', headerName: 'Termination Date', type: 'date'},
  { hide: false, editable: true, flex: 1, minWidth: 120, field: 'timezone', headerName: 'Timezone', type: 'singleSelect', valueOptions: timezones},
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

export function List() {

  const tenant_id = useSelector((state: RootState) => state.main.session.tenant_id);
  const {
    data: agents = [],
    isFetching: agentsFetching
  } = useAgents(tenant_id);

  return <>
      <TableWrapper>
        <Title> Agents </Title>

        <TableSpacer>
          <DataGrid
            rows={agents}
            columns={agentColumns}
            density={'compact'}
            autoPageSize
            hideFooterSelectedRowCount
            loading={agentsFetching}
            onCellEditCommit={({id: agent_id, field, value}) => {

              const formatMap = {
                start: (start: any) => DateTime.fromJSDate(start).toISODate(),
                end: (end: any) => DateTime.fromJSDate(end).toISODate(),
                hourlySalary: (salary: any) => salary,
                timezone: (timezone: any) => timezone,
              } as any;

              const body = { [field]: formatMap[field](value) };

              wfm.planning.api.put_employment_tenants_tenant_id_wfm_agents_agent_id_employment({
                pathParams: { tenant_id, agent_id },
                body,
              })
              .then(({name,id}: any) => {
               // refetchAgents();
              }).catch((err: any) => {

              });
            }}
          />
        </TableSpacer>
      </TableWrapper>
    </>;
}
