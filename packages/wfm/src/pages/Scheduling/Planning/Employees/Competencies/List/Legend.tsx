import { CheckMark } from '@cx/components/Icons/CheckMark';
import { Dot } from '@cx/components/Icons/Dot';
import { Label } from '@cx/components/Styled';
import * as React from 'react';

export function Legend() {

  return (
    <span>
      <Label>Competence</Label>
      {' '}
      <CheckMark size={15} />
      <Label>Future Change</Label>
      {' '}
      <Dot size={15} />
    </span>
  );
}
