export interface IForm {
  onSubmit(arg: any): any;
  onCancel?(): void;
  defaultValues: any;
  isFormSubmitting?: boolean;
}

export interface IField {
  align?: string;
}

export interface IFormField {
  label: string;
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
