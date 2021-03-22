import * as React from 'react';
import styled from 'styled-components';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import { CloseIcon } from '../Icons/Close';

const PositionedClose = styled(CloseIcon)`
  position: absolute;
  right: 24px;
  top: 17px;
`;

export interface SimpleDialogProps {
  title: string;
  open: boolean;
  close: () => void;
}

export const FormDialog: React.FC<SimpleDialogProps> = ({ title, open, children, close }) =>
  <Dialog
    open={open}
    fullWidth={true}
    maxWidth={'sm'}
    onClose={() => close()}
  >
    <DialogTitle> { title } </DialogTitle>
    <PositionedClose size={20} onClick={() => close()} />
    <DialogContent>
      { children }
    </DialogContent>
  </Dialog>;
