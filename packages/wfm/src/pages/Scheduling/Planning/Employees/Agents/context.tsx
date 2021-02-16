import * as React from 'react';
import { Props } from '../../../../../index.types';

// @ts-ignore
export const DataContext = React.createContext();

export function DataProvider({ children }: Props) {
  const selectedRow = React.useState({});
  const open = React.useState(false);

  const setFormState = (data: any, isOpen: boolean) => {
    const [, setSelected] = selectedRow;
    const [, setOpen] = open;
    setSelected(data);
    setOpen(isOpen);
  };

  return (
    <DataContext.Provider
      value={{
        selectedRow,
        open,
        setFormState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
