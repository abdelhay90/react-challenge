import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PassengerForm from './PassengerForm';

const AddPassenger = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const disableClickAndEsc = true;
  return (
    <>
      <Fab
        size='small'
        aria-label='Add Passenger'
        color='primary'
        onClick={toggleOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        fullWidth
        maxWidth='md'
        open={open}
        disableBackdropClick={disableClickAndEsc}
        disableEscapeKeyDown={disableClickAndEsc}
        onClose={toggleOpen}
      >
        <DialogTitle id='max-width-dialog-title'>
          Add Customer to Current Trip
        </DialogTitle>
        <DialogContent>
          <PassengerForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpen} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPassenger;
