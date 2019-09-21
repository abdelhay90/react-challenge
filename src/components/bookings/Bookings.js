import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Passenger from './Passenger';

function Bookings({ passengers = [] }) {
  return (
    <>
      <Box px={1} mx={1}>
        <Typography variant='h5'>Bookings</Typography>
      </Box>
      <Box display='flex' flexWrap='wrap' p={1} m={1}>
        {passengers.map(passenger => (
          <Passenger
            id={passenger.id}
            name={passenger.name}
            status={passenger.name}
            paymentMethod={passenger.name}
            imageUrl={passenger.imageUrl}
          />
        ))}
      </Box>
    </>
  );
}

export default Bookings;
