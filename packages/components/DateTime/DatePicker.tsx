import * as React from 'react';
import ReactDatePicker from 'react-datepicker';
import styled, { css, useTheme } from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';
import { IDatePickerContainer } from '@cx/types/time';
import { Calendar } from '../Icons/Calendar';
import { Clock } from '../Icons/Clock';

const DatePickerContainer = styled.div<IDatePickerContainer>`
  .react-datepicker-popper {
    z-index: 5;
  }

  .react-datepicker__input-container input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    border: 1px solid hsl(0, 0%, 80%);
    padding: 10px 15px;
    outline: none;

    &:focus {
      border-radius: 4px;
      box-shadow: 0 0 5px ${({ theme }) => theme.colors['accent-1']};
      border: 1px solid ${({ theme }) => theme.colors['accent-1']};
    }
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .react-datepicker__month--selected,
  .react-datepicker__month--in-selecting-range,
  .react-datepicker__month--in-range,
  .react-datepicker__quarter--selected,
  .react-datepicker__quarter--in-selecting-range,
  .react-datepicker__quarter--in-range {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .react-datepicker__month-text.react-datepicker__month--selected:hover,
  .react-datepicker__month-text.react-datepicker__month--in-range:hover,
  .react-datepicker__month-text.react-datepicker__quarter--selected:hover,
  .react-datepicker__month-text.react-datepicker__quarter--in-range:hover,
  .react-datepicker__quarter-text.react-datepicker__month--selected:hover,
  .react-datepicker__quarter-text.react-datepicker__month--in-range:hover,
  .react-datepicker__quarter-text.react-datepicker__quarter--selected:hover,
  .react-datepicker__quarter-text.react-datepicker__quarter--in-range:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .react-datepicker__close-icon::after {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    background-color: ${({ theme }) => theme.colors['accent-1']};
  }

  .react-datepicker__day--today,
  .react-datepicker__month-text--today,
  .react-datepicker__quarter-text--today,
  .react-datepicker__year-text--today {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 0.3rem;
    color: ${({ theme }) => theme.colors['accent-2']};
  }

  ${({ calendarBtn }) => calendarBtn
    && css`
      display: grid;
      grid-auto-columns: auto 1px 25px;
      gap: 3px;

      .react-datepicker-wrapper {
        grid-column: 1;
      }

      .react-datepicker__calendar-icon-trigger {
        grid-column: 3;
      }
    `};
`;
const CalendarIcon = styled(Calendar)`
  margin: auto;
  line-height: normal;
`;
const ClockIcon = styled(Clock)`
  margin: auto;
  line-height: normal;
`;

export function DatePicker({ calendarBtn = false, ...rest }: any): React.ReactElement {
  const theme: any = useTheme();
  const [datePickerIsOpen, setDatePickerIsOpen] = React.useState(false);

  const IconButton = rest.showTimeSelectOnly ? ClockIcon : CalendarIcon;

  return (
    <DatePickerContainer calendarBtn={calendarBtn}>
      <ReactDatePicker
        dateFormat="MMM dd, yyyy"
        placeholderText="MMM dd, yyyy"
        todayButton="Today"
        shouldCloseOnSelect={false}
        closeOnScroll
        open={datePickerIsOpen}
        onFocus={() => setDatePickerIsOpen(true)}
        onClickOutside={() => setDatePickerIsOpen(false)}
        {...rest}
      />
      {calendarBtn && (
        <IconButton
          fill={theme.colors.secondary}
          onClick={() => setDatePickerIsOpen(true)}
          title="Open calendar"
          className="react-datepicker__calendar-icon-trigger"
        />
      )}
    </DatePickerContainer>
  );
}
