import * as React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Wrapper } from '@cx/components/Styled';
import { DateTime } from 'luxon';
import { getAgentOrganizationHistory, getTeams, getTimezones } from '@cx/fakedata/planningEmployeesAgents';
import { useFormState } from '../context';
import { FormLayout } from './layout';

const FormWrapper = styled(Wrapper)`
  grid-column: 2;
`;

const initialValues = {
  validFrom: '',
  validTo: '',
  team: '',
  employmentDate: new Date(),
  employmentEndDate: new Date(),
  timezone: '',
};

export function Form() {
  const {
    selectedRow: [selected],
    setFormState,
  }: any = useFormState();

  const { id } = selected;

  const organizationHistoryQuery = useQuery(
    ['fetchAgentOrganizationHistory', id],
    async () => getAgentOrganizationHistory(id)
      .then((result: any) => result.data)
      .catch((err: Error) => {
        console.error(err);
        throw err;
      }),
    { refetchInterval: 30000 },
  );
  const timezonesQuery = useQuery(
    'fetchTimezones',
    async () => getTimezones()
      .then((result: any) => result.data)
      .catch((err: Error) => {
        console.error(err);
        throw err;
      }),
    { refetchOnWindowFocus: false },
  );
  const teamsQuery = useQuery(
    'fetchTeams',
    async () => getTeams()
      .then((result: any) => result.data)
      .catch((err: Error) => {
        console.error(err);
        throw err;
      }),
    { refetchOnWindowFocus: false },
  );

  const organizationHistoryColumns = React.useMemo(
    () => [
      { Header: 'Team', accessor: 'team' },
      {
        Header: 'Valid From',
        accessor: 'validFrom',
        Cell: ({ value }: any) => DateTime.fromJSDate(value).toLocaleString(DateTime.DATE_MED),
      },
      {
        Header: 'Valid To',
        accessor: 'validTo',
        Cell: ({ value }: any) => (value ? DateTime.fromJSDate(value).toLocaleString(DateTime.DATE_MED) : ''),
      },
    ],
    [],
  );
  const memoOrganizationHistory = React.useMemo(() => {
    if (organizationHistoryQuery.isLoading && !organizationHistoryQuery.data) {
      return [];
    }
    return organizationHistoryQuery.data;
  }, [organizationHistoryQuery.isLoading, organizationHistoryQuery.data]);

  const memoTimezones = React.useMemo(() => {
    if (timezonesQuery.isLoading && !timezonesQuery.data) {
      return [];
    }
    return timezonesQuery.data.map((tz: any) => ({ value: tz.id, label: tz.label }));
  }, [timezonesQuery.isLoading, timezonesQuery.data]);

  const memoTeams = React.useMemo(() => {
    if (teamsQuery.isLoading && !teamsQuery.data) {
      return [];
    }
    return teamsQuery.data.map((tz: any) => ({ value: tz.id, label: tz.label }));
  }, [teamsQuery.isLoading, teamsQuery.data]);

  const defaultValues = React.useMemo(() => ({ ...initialValues, ...selected }), [selected]);

  const onSubmit = (data: any) => console.log('submitted', data);

  const onCancel = () => setFormState({}, undefined);

  return (
    <FormWrapper>
      {selected.name && <h3>{selected.name}</h3>}

      <FormLayout
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        timezones={memoTimezones}
        timezonesLoading={timezonesQuery.isLoading}
        teams={memoTeams}
        teamsLoading={teamsQuery.isLoading}
        organizationHistoryColumns={organizationHistoryColumns}
        organizationHistoryData={memoOrganizationHistory}
        organizationHistoryLoading={organizationHistoryQuery.isLoading}
        onCancel={onCancel}
        key={defaultValues.id || 'register-new'}
      />
    </FormWrapper>
  );
}
