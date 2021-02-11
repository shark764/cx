import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { DateTime } from 'luxon';
import { addDays, getMonday, isSameDay } from '@cx/wfm/utilities/date';
import { round } from '@cx/wfm/utilities/number';
import { IEvent } from '@cx/wfm/index.types';

const CalFooter = styled.div`
  margin: 0 auto;
  padding: 10px;
`;
const Rtable = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px auto;
`;
interface RtableCellProps {
  header?: boolean;
  strong?: boolean;
}

const RtableCell = styled.div<RtableCellProps>`
  flex: 1;
  text-align: center;

  ${({ header }) => header
    && css`
      width: 78px;
      min-width: 78px;
      max-width: 78px;
    `};
  ${({ strong }) => strong
    && css`
      font-weight: 900;
    `};
`;

interface FooterProps {
  date: Date;
  events: IEvent[];
}

export function Footer({ date, events }: FooterProps) {
  const now = new Date(date);
  const monday = getMonday(now);
  const hours = [
    { day: 'monday', add: 0 },
    { day: 'tuesday', add: 1 },
    { day: 'wednesday', add: 2 },
    { day: 'thursday', add: 3 },
    { day: 'friday', add: 4 },
    { day: 'saturday', add: 5 },
    { day: 'sunday', add: 6 },
  ].map((d) => {
    const day = d.add > 0 ? addDays(monday, d.add) : monday;
    const hour = events.reduce((total, current) => {
      if (isSameDay(day, current.start)) {
        const start = DateTime.fromJSDate(new Date(current.start));
        const end = DateTime.fromJSDate(new Date(current.end));
        const diff = end.diff(start, ['hours', 'minutes']).toObject();
        // @ts-ignore
        const evtH = diff.hours + round(diff.minutes / 60, 2);
        return total + evtH;
      }
      return total;
    }, 0);
    return {
      day: d.day,
      hour,
    };
  });

  return (
    <CalFooter>
      <Rtable>
        <RtableCell header>Hours</RtableCell>
        {hours.map((h) => (
          <RtableCell key={`day-${h.day}`}>{h.hour}</RtableCell>
        ))}
      </Rtable>
      <Rtable>
        <RtableCell header>Total</RtableCell>
        <RtableCell strong>{hours.reduce((total, h) => total + h.hour, 0)}</RtableCell>
      </Rtable>
    </CalFooter>
  );
}

Footer.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      start: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({})]),
      end: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({})]),
      style: PropTypes.shape({}),
      desc: PropTypes.string,
    }),
  ),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({})]),
};
