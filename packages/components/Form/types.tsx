export interface IForm {
  onSubmit(arg: any): any;
  onCancel?(): void;
  defaultValues: any;
}

export interface IOption {
  value: string | number;
  label: string;
}
