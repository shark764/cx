import { CheckMark } from '@cx/components/Icons/CheckMark';
import { Dot } from '@cx/components/Icons/Dot';
import { Label } from '@cx/components/Styled';
import * as React from 'react';
import styled, { useTheme } from 'styled-components';

const CheckMark2 = styled(CheckMark)`
  display: inline-block;
`;
const Dot2 = styled(Dot)`
  display: inline-block;
`;

export function Legend() {
  const theme: any = useTheme();

  return (
    <span>
      <Label>Competence</Label>
      {' '}
      <CheckMark2 size={15} fill={theme.colors.primary} />
      <Label>Future Change</Label>
      {' '}
      <Dot2 size={15} fill={theme.colors.primary} />
    </span>
  );
}
