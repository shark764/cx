import * as React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

export const UnsavedDialog: React.FC<SimpleDialogProps> = ({open, onClose}) => (
    <Dialog  onClose={onClose} open={open}>
      <DialogTitle>
      You have unsaved changes, are you sure you want to continue?
      </DialogTitle>
      <DialogActions>
        <Button autoFocus color="primary">
          Cancel
        </Button>
        <Button color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
