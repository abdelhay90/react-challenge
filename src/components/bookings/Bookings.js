import React from 'react';
import { Box, Typography } from '@material-ui/core';
import AddPassenger from './AddPassenger';
import PassengerList from './PassengerList';

function Bookings({ passengers = [] }) {
  return (
    <>
      <Box component='div' px={1} mx={1} display='flex'>
        <Box pr={1}>
          <Typography variant='h5'>Bookings</Typography>
        </Box>
        <Box px={1}>
          <AddPassenger />
        </Box>
      </Box>
      <Box>
        <PassengerList passengers={passengers} />
      </Box>
    </>
  );
}

export default Bookings;
