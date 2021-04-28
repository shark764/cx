import { FormField } from '@cx/components/Form/Fields/FormField';
import { HeaderGroup } from '@cx/components/Form/HeaderGroup';
import { Button } from '@cx/components/Inputs/Button';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { IForm, IOption } from '@cx/types/form';
import Select from 'react-select';
import { DataTable, TableContainer } from '@cx/components/DataTable';
import { IColumnData, ITableData } from '@cx/types/table';

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 50px 0;
  padding: 25px;
  border-top: solid 1px rgba(128, 128, 128, 0.59);
`;
const AButton = styled(Button)`
  padding: 10px 25px;
  border-radius: 8px;
`;

const FormTableContainer = styled(TableContainer)`
  padding: 0 0.5rem;
  .table {
    border: 1px solid #80808096;
    border-radius: 5px;
    .row {
      &:last-child {
        .cell {
          border-bottom: none;
        }
      }
    }
    .header {
      font-weight: bold;
      margin-bottom: 0;
    }
    .cell {
      border-bottom: 1px solid #80808096;
      text-align: center;
    }
  }
`;

interface IFormLayout extends IForm {
  timezones: IOption[];
  teams: IOption[];
  organizationHistoryColumns: IColumnData[];
  organizationHistoryData: ITableData[];
  organizationHistoryLoading: boolean;
}
export function FormLayout({
  onSubmit,
  defaultValues = {},
  timezones,
  teams,
  organizationHistoryColumns,
  organizationHistoryData,
  organizationHistoryLoading,
  onCancel,
  isFormSubmitting = false,
}: IFormLayout) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues,
  });

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderGroup title="Organization">
        <h4>Set New</h4>

        <FormField label="Valid From">
          <Controller
            control={control}
            name="validFrom"
            render={({ onChange, onBlur, value }) => (
              <DatePicker
                onChange={onChange}
                selected={value}
              />
            )}
          />
        </FormField>
        <FormField label="Valid To">
          <Controller
            control={control}
            name="validTo"
            render={({ onChange, onBlur, value }) => (
              <DatePicker
                onChange={onChange}
                selected={value}
              />
            )}
          />
        </FormField>
        <FormField label="Team">
          <Controller
            name="team"
            type="select"
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Select
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={teams}
                isClearable
                isDisabled={isFormSubmitting}
              />
            )}
          />
        </FormField>

        <h4>History</h4>

        <FormTableContainer>
          <DataTable
            columns={organizationHistoryColumns}
            data={organizationHistoryData}
            loading={organizationHistoryLoading}
          />
        </FormTableContainer>
      </HeaderGroup>

      <HeaderGroup title="Employment Dates">
        <FormField label="Date of Employment">
          <Controller
            control={control}
            name="employmentDate"
            render={({ onChange, onBlur, value }) => (
              <DatePicker
                onChange={onChange}
                selected={value}
              />
            )}
          />
        </FormField>
        <FormField label="End of Employment">
          <Controller
            control={control}
            name="employmentEndDate"
            render={({ onChange, onBlur, value }) => (
              <DatePicker
                onChange={onChange}
                selected={value}
              />
            )}
          />
        </FormField>
      </HeaderGroup>

      <HeaderGroup title="Timezone">
        <FormField label="Timezone">
          <Controller
            name="timezone"
            type="select"
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Select
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={timezones}
                isClearable
                isDisabled={isFormSubmitting}
              />
            )}
          />
        </FormField>
      </HeaderGroup>

      <Actions>
        <AButton type="button" onClick={onCancel} label="Cancel" bgColor="white" />
        <AButton type="submit" label="Submit" disabled={isFormSubmitting} primary />
      </Actions>
    </form>
  );
}
