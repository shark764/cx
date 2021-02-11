import * as React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Wrapper } from '@cx/components/Styled';
import { IOption } from '@cx/components/Form/types';
import { log } from '@cx/wfm/utilities';
import { getTeams, getTimezones } from '../fake-data';
import { DataContext } from '../context';
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
    open: [open],
    setFormState,
  }: any = React.useContext(DataContext);

  const timezonesQuery = useQuery(
    'fetchTimezones',
    async () => getTimezones()
      .then((result: any) => result.data)
      .catch((err: Error) => {
        console.error(err);
        throw err;
      }),
    {
      refetchOnWindowFocus: false,
    },
  );
  const teamsQuery = useQuery(
    'fetchTeams',
    async () => getTeams()
      .then((result: any) => result.data)
      .catch((err: Error) => {
        console.error(err);
        throw err;
      }),
    {
      refetchOnWindowFocus: false,
    },
  );

  const memoTimezones = React.useMemo(() => {
    if (timezonesQuery.isLoading && !timezonesQuery.data) {
      return [];
    }
    return timezonesQuery.data.map((tz: any) => ({
      value: tz.id,
      label: tz.label,
    }));
  }, [timezonesQuery.isLoading, timezonesQuery.data]);

  const memoTeams = React.useMemo(() => {
    if (teamsQuery.isLoading && !teamsQuery.data) {
      return [];
    }
    return teamsQuery.data.map((tz: any) => ({
      value: tz.id,
      label: tz.label,
    }));
  }, [teamsQuery.isLoading, teamsQuery.data]);

  const defaultValues = React.useMemo(() => {
    const formattedValues: any = {};
    if (selected.id) {
      formattedValues.timezone = memoTimezones.find((item: IOption) => item.value === selected.timezone);
      formattedValues.team = memoTeams.find((item: IOption) => item.value === selected.team);
    }
    log('warning', 'Not working yet');
    return {
      ...initialValues,
      ...selected,
      ...formattedValues,
    };
  }, [initialValues, selected, memoTimezones, memoTeams]);

  const onSubmit = (data: any) => console.log('submitted', data);

  const onCancel = () => setFormState({}, undefined);

  if (!open) {
    return null;
  }

  return (
    <FormWrapper>
      <FormLayout
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        timezones={memoTimezones}
        timezonesLoading={timezonesQuery.isLoading}
        teams={memoTeams}
        teamsLoading={teamsQuery.isLoading}
        onCancel={onCancel}
        key={defaultValues.id || 'register-new'}
      />
    </FormWrapper>
  );
}
