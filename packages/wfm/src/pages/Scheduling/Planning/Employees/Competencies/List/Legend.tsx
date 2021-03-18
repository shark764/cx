import { CheckMark } from '@cx/components/Icons/CheckMark';
import { Dot } from '@cx/components/Icons/Dot';
import { Label } from '@cx/components/Styled';
import * as React from 'react';
import { useTheme } from 'styled-components';

export function Legend() {
  const theme: any = useTheme();

  return (
    <span>
      <Label>Competence</Label>
      {' '}
      <CheckMark size={15} fill={theme.colors.primary} />
      <Label>Future Change</Label>
      {' '}
      <Dot size={15} fill={theme.colors.primary} />
    </span>
  );
}
