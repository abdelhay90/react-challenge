import React from 'react';
import { Box, Typography } from '@material-ui/core';
import LinearScale from '@material-ui/icons/LinearScale';
import AttachMoney from '@material-ui/icons/AttachMoney';

export default function TripTimeLineDetails({ distance = 1, basefare = 25 }) {
  return (
    <Box m={1}>
      <Typography variant='h6'>
        <LinearScale /> <span>{`Trip Distance ${distance} KM`}</span>
      </Typography>
      <Typography variant='h6'>
        <AttachMoney /> <span>{`Trip Base Fare $${basefare}`}</span>
      </Typography>
    </Box>
  );
}
