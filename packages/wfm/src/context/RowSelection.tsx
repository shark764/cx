import * as React from 'react';
import { Props } from '@cx/types';

// @ts-ignore
export const FormDataContext = React.createContext();

export function FormDataProvider({ children }: Props) {
  const selectedRow = React.useState({});
  const open = React.useState(false);
  const isFormSubmitting = React.useState(false);

  const setFormState = (data: any, isOpen: boolean) => {
    const [, setSelected] = selectedRow;
    const [, setOpen] = open;
    setSelected(data);
    setOpen(isOpen);
  };

  return (
    <FormDataContext.Provider
      value={{
        selectedRow,
        open,
        setFormState,
        isFormSubmitting,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
}

export function useFormState() {
  const context = React.useContext(FormDataContext);
  if (context === undefined) {
    throw new Error('useFormState must be used within a FormDataProvider');
  }
  return context;
}
