export interface IForm {
  onSubmit(arg: any): any;
  onCancel?(): void;
  defaultValues: any;
  isFormSubmitting?: boolean;
  isAddMode?: boolean;
}

export interface IField {
  align?: string;
}

export interface IFormField {
  label?: string;
  align?: string;
  children: React.ReactNode;
}

export interface IOption {
  value: string | number;
  label: string;
}

export interface IHeaderGroup {
  title: string;
  children: React.ReactNode;
}

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button';
  size?: number;
  disabled?: boolean;
  primary?: boolean;
  secondary?: boolean;
  color?: string;
  bgColor?: string;
}

export interface IFormContext {
  open: [boolean, (isOpen: boolean) => void];
  setFormState: (data: any, isOpen: boolean) => void;
  isFormSubmitting: [boolean, (arg: boolean) => void];
  onCancel(): void;
}
export interface ISingleRowFormContext extends IFormContext {
  selectedRow: [any, (row: any) => void];
}

export interface IMultipleRowFormContext extends IFormContext {
  selectedRows: [any[], (rows: any[]) => void];
}
