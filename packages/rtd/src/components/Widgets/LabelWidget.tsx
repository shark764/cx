import { Typography } from '@material-ui/core';
import { WidgetData } from 'settings/types';
import styled from 'styled-components';

const LabelWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ececec;
`;
const Label = styled(Typography)`
  font-weight: bold;
`;

export function LabelWidget({ widget }: { widget: WidgetData }) {
  return (
    <LabelWrapper>
      <Label variant="h5" color="textSecondary">
        {widget.presentation.text}
      </Label>
    </LabelWrapper>
  );
}
