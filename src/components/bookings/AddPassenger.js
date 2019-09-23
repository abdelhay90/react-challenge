import React, { useState } from 'react';
import { inject } from 'mobx-react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PassengerForm from './PassengerForm';

const AddPassenger = inject('trip')(({ trip }) => {
  const [open, setOpen] = useState(false);
  const [addLabel, setAddLabel] = useState('Add Passenger');
  const toggleOpen = () => {
    setOpen(!open);
    if (trip.isTripMaxCapacity) {
      setAddLabel('Max Capacity');
    }
  };
  const disableClickAndEsc = true;
  return (
    <>
      <Tooltip title={addLabel} aria-label='add'>
        <Fab
          size='small'
          aria-label='Add Passenger'
          color='primary'
          onClick={toggleOpen}
          disabled={trip.isTripMaxCapacity}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
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
          <PassengerForm onPassengerAdded={toggleOpen} />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpen} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default AddPassenger;
