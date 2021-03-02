import * as React from 'react';
import styled from 'styled-components';
import { Wrapper } from '@cx/components/Styled';
import { useFormState } from 'context/RowSelection';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { log } from '@cx/utilities';
import { handleError } from '@cx/utilities/error';
import { updateAvailabilityTimeTable } from '@cx/fakedata/planningEmployeesAvailabilities';
import { getAgents } from '@cx/fakedata/planningEmployeesAgents';
import { IOption, ISingleRowFormContext } from '@cx/types/form';
import { FormLayout } from './layout';

const FormWrapper = styled(Wrapper)`
  grid-column: 2;
`;

const initialValues = {
  name: '',
  startDate: '',
  endDate: '',
  weeks: [],
  submitChangesTimeTable: false,
  saveAsTimetable: false,
  newName: '',
  newStartDate: '',
  newEndDate: '',
  connectTo: '',
};

export function Form() {
  const {
    selectedRow: [selected, setSelected],
    isFormSubmitting: [isFormSubmitting, setIsFormSubmitting],
    onCancel,
  }: ISingleRowFormContext = useFormState();

  const { timetable } = selected;
  const { id } = timetable;
  const isAddMode = !id;

  const agentsQuery = useQuery<any, Error>('fetchAgents', getAgents);
  const memoAgents = React.useMemo(
    () => agentsQuery.data?.map((agentItem: any) => ({ value: agentItem.id, label: agentItem.name })) || [],
    [agentsQuery.data],
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(updateAvailabilityTimeTable, {
    onSuccess(response: any) {
      log('success', response.message, response.data);
      queryClient.invalidateQueries('fetchAvailabilities');
      queryClient.invalidateQueries('fetchAgentAvailabilityTimeTable');

      const updatedData = {
        ...selected,
        timetable: {
          ...response.data,
          saveAsTimetable: false,
          newName: '',
          newStartDate: '',
          newEndDate: '',
          connectTo: '',
        },
      };
      setSelected(updatedData);
    },
    onError(err: Error) {
      handleError(err);
    },
    onSettled() {
      setIsFormSubmitting(false);
    },
  });

  const defaultValues = React.useMemo(
    () => ({
      ...initialValues,
      ...timetable,
      connectTo: timetable.connectTo ? memoAgents.find((agent: IOption) => agent.value === timetable.connectTo.id) : '',
    }),
    [memoAgents, timetable],
  );

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      connectTo: data.connectTo?.value || null,
      weeks: data.weeks.map((week: any, index: number) => ({ ...week, week: index + 1 })),
    };

    setIsFormSubmitting(true);

    mutation.mutate({ id, payload });
  };

  return (
    <FormWrapper>
      <h4>Availability Timetable</h4>
      {selected.agent && <h3>{selected.agent}</h3>}

      <FormLayout
        onSubmit={onSubmit}
        isAddMode={isAddMode}
        defaultValues={defaultValues}
        agents={memoAgents}
        onCancel={onCancel}
        isFormSubmitting={isFormSubmitting}
        key={defaultValues.id || 'register-new'}
      />
    </FormWrapper>
  );
}
