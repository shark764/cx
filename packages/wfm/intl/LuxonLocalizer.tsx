// @ts-ignore
import * as dates from 'react-big-calendar/lib/utils/dates';
// @ts-ignore
import { DateLocalizer } from 'react-big-calendar/lib/localizer';

const dateRangeFormat = ({ start, end }: any, culture: any, local: any) =>
  `${local.format(start, 'D', culture)} — ${local.format(end, 'D', culture)}`;

const timeRangeFormat = ({ start, end }: any, culture: any, local: any) =>
  `${local.format(start, 't', culture)} — ${local.format(end, 't', culture)}`;

const timeRangeStartFormat = ({ start }: any, culture: any, local: any) =>
  `${local.format(start, 't', culture)} — `;

const timeRangeEndFormat = ({ end }: any, culture: any, local: any) =>
  ` — ${local.format(end, 't', culture)}`;

const weekRangeFormat = ({ start, end }: any, culture: any, local: any) =>
  `${local.format(start, 'MMMM dd', culture)} — ${local.format(
    end,
    dates.eq(start, end, 'month') ? 'dd' : 'MMMM dd',
    culture
  )}`;

export const formats = {
  dateFormat: 'dd',
  dayFormat: 'dd EEE',
  weekdayFormat: 'ccc',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,

  timeGutterFormat: 't',

  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'cccc MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ccc MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat,
};

export const LuxonLocalizer = function luxonLocalizer(
  DateTime: any,
  { firstDayOfWeek }: any
) {
  const locale = (d: any, c: any) => (c ? d.reconfigure(c) : d);

  return new DateLocalizer({
    formats,
    firstOfWeek() {
      return firstDayOfWeek;
    },

    format(value: any, format: any, culture: any) {
      return locale(DateTime.fromJSDate(value), culture).toFormat(format);
    },
  });
};
