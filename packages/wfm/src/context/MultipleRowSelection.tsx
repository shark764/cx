import * as React from 'react';
import { Props } from '@cx/types';
import { IMultipleRowFormContext } from '@cx/types/form';

// @ts-ignore
export const FormDataContext = React.createContext();

export function FormDataProvider({ children }: Props) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const defaultRestriction = React.useState({});
  const isFormSubmitting = React.useState(false);

  const setFormState = (rows: any, isOpen: boolean) => {
    setSelectedRows(rows);
    setOpen(isOpen);
  };

  const onRowSelection = (row: any) => {
    setSelectedRows((rows: any) => {
      const idx = rows.findIndex((r: any) => r.id === row.id);
      console.log({ rows, row, idx });
      if (idx !== -1) {
        return rows.filter((r: any) => r.id !== row.id);
      }
      return [...rows, row];
    });
  };

  const onCancel = () => setFormState([], false);

  React.useEffect(() => {
    setOpen(selectedRows.length > 0);
  }, [selectedRows.length]);

  return (
    <FormDataContext.Provider
      value={{
        selectedRows: [selectedRows, setSelectedRows],
        open: [open, setOpen],
        setFormState,
        onRowSelection,
        defaultRestriction,
        isFormSubmitting,
        onCancel,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
}

export function useFormState(): IMultipleRowFormContext {
  const context = React.useContext(FormDataContext);
  if (context === undefined) {
    throw new Error('useFormState must be used within a FormDataProvider');
  }
  // @ts-ignore
  return context;
}
