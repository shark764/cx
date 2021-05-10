import * as React from 'react';
import { CheckMark } from '@cx/components/Icons/CheckMark';
import { Dot } from '@cx/components/Icons/Dot';
import { Label } from '@cx/components/Styled';

export function Legend() {
  return (
    <span>
      <Label>Default Set</Label>
      {' '}
      <CheckMark size={15} />
      <Label>Future Change</Label>
      {' '}
      <Dot size={15} />
    </span>
  );
}
