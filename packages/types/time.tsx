export interface IEvent {
  start: Date;
  end: Date;
  desc?: string;
  title?: string;
  style?: any;
}

export interface IBigCalendar {
  events: IEvent[];
  date: Date;
  onNavigate(arg: Date): void;
  height?: string;
  width?: string;
  className?: string;
  components?: any;
  formats?: any;
  defaultView?: string;
  views?: any;
  toolbar?: boolean;
  min?: Date;
  max?: Date;
  step?: number;
  timeslots?: number;
  eventPropGetter(arg: IEvent): any;
}

export interface IDatePickerContainer {
  calendarBtn?: boolean;
}
