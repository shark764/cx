import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { Tooltip } from '@cx/components/Tooltip';
import { IEvent } from '@cx/types/time';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

interface IEvent2 {
  event: IEvent;
  title: string;
}
export function Event({ event, title, ...rest }: IEvent2) {
  return (
    <Tooltip
      content={(
        <div>
          <strong>{title}</strong>
          {' '}
          {DateTime.fromJSDate(event.start).toLocaleString(DateTime.TIME_SIMPLE)}
          {' '}
          &#8213;
          {' '}
          {DateTime.fromJSDate(event.end).toLocaleString(DateTime.TIME_SIMPLE)}
        </div>
      )}
      direction="right"
      delay={100}
    >
      <Container>
        <span>
          <strong>{event.title}</strong>
          {event.desc && `:  ${event.desc}`}
        </span>
      </Container>
    </Tooltip>
  );
}

Event.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    start: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({})]),
    end: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({})]),
    style: PropTypes.shape({}),
    desc: PropTypes.string,
  }),
  title: PropTypes.string,
};
