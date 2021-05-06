import * as React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { Wrapper } from '@cx/components/Styled';
import { DateTime } from 'luxon';
import { getAgentOrganizationHistory, getTeams, getTimezones, updateAgent } from '@cx/fakedata/planningEmployeesAgents';
import { log } from '@cx/utilities';
import { IOption, ISingleRowFormContext } from '@cx/types/form';
import { useFormState } from 'context/RowSelection';
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
    selectedRow: [selected, setSelected],
    isFormSubmitting: [isFormSubmitting, setIsFormSubmitting],
    onCancel,
  }: ISingleRowFormContext = useFormState();

  const { id } = selected;

  const organizationHistoryQuery = useQuery<any, Error>(
    ['fetchAgentOrganizationHistory', { agentId: id }],
    () => getAgentOrganizationHistory(id),
    { refetchInterval: 30000 },
  );
  const timezonesQuery = useQuery<any, Error>('fetchTimezones', getTimezones, { refetchOnWindowFocus: false });
  const teamsQuery = useQuery<any, Error>('fetchTeams', getTeams, { refetchOnWindowFocus: false });

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
  const memoOrganizationHistory = React.useMemo(() => organizationHistoryQuery.data || [], [
    organizationHistoryQuery.data,
  ]);

  const memoTimezones = React.useMemo(
    () => timezonesQuery.data?.map((timezoneItem: any) => ({ value: timezoneItem.id, label: timezoneItem.label })) || [],
    [timezonesQuery.data],
  );

  const memoTeams = React.useMemo(
    () => teamsQuery.data?.map((teamItem: any) => ({ value: teamItem.id, label: teamItem.label })) || [],
    [teamsQuery.data],
  );

  const queryClient = useQueryClient();

  /**
   * TODO:
   * Probably we well need two calls, one for the form,
   * one to add a row in organization history
   */
  const mutation = useMutation(updateAgent, {
    onSuccess(response: any) {
      log('success', response.message, response.data);
      queryClient.invalidateQueries('fetchAgents');
      queryClient.invalidateQueries('fetchAgentOrganizationHistory');

      const updatedData = {
        ...selected,
        ...response.data,
        validFrom: '',
        validTo: '',
      };
      setSelected(updatedData);
    },
    onError(err) {
      console.error(err);
      throw err;
    },
    onSettled() {
      setIsFormSubmitting(false);
    },
  });

  const defaultValues = React.useMemo(
    () => ({
      ...initialValues,
      ...selected,
      team: memoTeams.find((team: IOption) => team.value === selected.team) || '',
      timezone: memoTimezones.find((timezone: IOption) => timezone.value === selected.timezone) || '',
    }),
    [memoTeams, memoTimezones, selected],
  );

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      team: data.team.value,
      timezone: data.timezone.value,
    };

    setIsFormSubmitting(true);

    mutation.mutate({ id, payload });
  };

  return (
    <FormWrapper>
      {selected.name && <h3>{selected.name}</h3>}

      <FormLayout
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        timezones={memoTimezones}
        teams={memoTeams}
        organizationHistoryColumns={organizationHistoryColumns}
        organizationHistoryData={memoOrganizationHistory}
        organizationHistoryLoading={organizationHistoryQuery.isLoading}
        onCancel={onCancel}
        isFormSubmitting={isFormSubmitting}
        key={defaultValues.id || 'register-new'}
      />
    </FormWrapper>
  );
}
