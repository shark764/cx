import * as React from 'react';
import styled from 'styled-components';
import { Wrapper } from '@cx/components/Styled';
import { updateCompetency, humanizeQueue } from '@cx/fakedata/planningEmployeesCompetencies';
import { useMutation, useQueryClient } from 'react-query';
import { log } from '@cx/utilities';
import { useFormState } from 'context/RowSelection';
import { FormLayout } from './layout';

const FormWrapper = styled(Wrapper)`
  grid-column: 2;
`;

const initialValues = {
  validFrom: '',
  competencies: [],
  queues: [],
};

export function Form() {
  const {
    selectedRow: [selected, setSelected],
    setFormState,
    isFormSubmitting: [isFormSubmitting, setIsFormSubmitting],
  }: any = useFormState();

  const { id } = selected;

  const queryClient = useQueryClient();

  const mutation = useMutation(updateCompetency, {
    onSuccess(response: any) {
      log('success', response.message, response.data);
      queryClient.invalidateQueries('fetchCompetencies');

      const updatedData = {
        ...selected,
        ...response.data,
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

  const competencies = [
    { value: 'admin', label: 'Admin' },
    { value: 'backOffice', label: 'Back Office' },
    { value: 'teamLeader', label: 'Team Leader' },
  ];
  const memoQueues = React.useMemo(() => {
    // Check if selected object is not empty
    if (Object.keys(selected).length > 0) {
      return Object.keys(selected)
        .filter((k) => k.startsWith('queue-'))
        .map((k) => ({ value: k, label: humanizeQueue(k) }));
    }
    return [];
  }, [selected]);

  const defaultValues = React.useMemo(() => {
    if (Object.keys(selected).length > 0) {
      const availableCompetencies = ['admin', 'backOffice', 'teamLeader'];
      const competencyValues = availableCompetencies.filter((c: string) => selected[c]);
      const availableQueues = Object.keys(selected).filter((k) => k.startsWith('queue-'));
      // If there is just one element in checklist, we cannot
      // send an array of values, instead we send the boolean value
      const queueValues = availableQueues.length > 1 ? availableQueues.filter((q: string) => selected[q]) : selected[availableQueues[0]];
      return {
        ...initialValues,
        ...selected,
        competencies: competencyValues,
        queues: queueValues,
      };
    }
    return { ...initialValues, ...selected };
  }, [selected]);

  const onSubmit = async (data: any) => {
    console.log('values submitted', data);

    const payload = {
      ...data,
      queues: data.queues ? data.queues : [],
    };

    setIsFormSubmitting(true);

    mutation.mutate({ id, payload });
  };

  const onCancel = () => setFormState({}, false);

  return (
    <FormWrapper>
      {selected.name && <h3>{selected.name}</h3>}

      <FormLayout
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        competencies={competencies}
        queues={memoQueues}
        onCancel={onCancel}
        isFormSubmitting={isFormSubmitting}
        key={defaultValues.id || 'register-new'}
      />
    </FormWrapper>
  );
}
