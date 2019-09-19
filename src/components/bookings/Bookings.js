import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Passenger from './Passenger';

function Bookings() {
  return (
    <>
      <Box px={1} mx={1}>
        <Typography variant='h5'>Bookings</Typography>
      </Box>
      <Box display='flex' flexWrap='wrap' p={1} m={1}>
        <Passenger />
        <Passenger />
        <Passenger />
        <Passenger />
      </Box>
    </>
  );
}

export default Bookings;
