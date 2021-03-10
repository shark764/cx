import * as React from 'react';
import styled from 'styled-components';
import { Wrapper } from '@cx/components/Styled';
import { useMutation, useQueryClient } from 'react-query';
import { log } from '@cx/utilities';
import { bulkUpdateRestriction, updateRestriction } from '@cx/fakedata/planningEmployeesRestrictions';
import { IPayload } from '@cx/types/api';
import { useFormState } from 'context/MultipleRowSelection';
import { FormLayout } from './layout';

const FormWrapper = styled(Wrapper)`
  grid-column: 2;
`;

const initialValues = {
  isDefault: false,
  validFrom: '',
  defaultSet: false,
  agreedHours: 0,
  minHours: 0,
  maxHours: 0,
  minShift: 0,
  maxShift: 0,
  minShiftLength: 0,
  maxShiftLength: 0,
  maxWorkDays: 0,
  maxWeekends: 0,
  minWeekRest: 0,
  minNightRest: 0,
};

export function Form() {
  const {
    selectedRows: [selected, setSelected],
    setFormState,
    defaultRestriction: [defaultRestriction],
    isFormSubmitting: [isFormSubmitting, setIsFormSubmitting],
  }: any = useFormState();

  const queryClient = useQueryClient();

  const handleUpdate = ({ ids, payload }: IPayload) => {
    if (!ids || ids.length === 0) {
      throw Error('Array of identifiers is undefined or empty');
    }
    if (ids.length > 1) {
      return bulkUpdateRestriction({ ids, payload });
    }
    return updateRestriction({ id: ids[0], payload });
  };

  const mutation = useMutation(handleUpdate, {
    onSuccess(response: any) {
      log('success', response.message, response.data);
      queryClient.invalidateQueries('fetchRestrictions');

      const updatedData = Array.isArray(response.data)
        ? response.data.map((item: any) => ({
          ...selected.find((sel: any) => sel.id === item.id),
          ...item,
        }))
        : [{ ...selected, ...response.data }];

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

  const defaultValues = React.useMemo(() => {
    if (selected.length > 0) {
      return { ...initialValues, ...selected[0] };
    }
    return { ...initialValues, ...selected };
  }, [selected]);

  const onSubmit = async (data: any) => {
    console.log('values submitted', data);

    const payload = {
      ...data,
    };

    const ids = selected.map((sel: any) => sel.id);

    setIsFormSubmitting(true);

    mutation.mutate({ ids, payload });
  };

  const onCancel = () => setFormState([], undefined);

  const formHeader = React.useMemo(() => {
    if (selected.length > 0) {
      if (selected.length > 1) {
        return `Bulk Edit - ${selected.length} Employees Selected`;
      }
      return selected[0].name;
    }
    return null;
  }, [selected]);

  return (
    <FormWrapper>
      {formHeader && <h3>{formHeader}</h3>}

      <FormLayout
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        onCancel={onCancel}
        defaultRestriction={defaultRestriction}
        isFormSubmitting={isFormSubmitting}
        key={defaultValues.id || 'register-new'}
      />
    </FormWrapper>
  );
}
