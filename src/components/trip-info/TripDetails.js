import React from 'react';
import { Box, Typography } from '@material-ui/core';
import LinearScale from '@material-ui/icons/LinearScale';
import AttachMoney from '@material-ui/icons/AttachMoney';

export default function TripTimeLineDetails() {
  return (
    <Box p={1} m={1}>
      <Typography variant='h6' gutterBottom>
        <LinearScale />
      </Typography>
      <Typography variant='h6' gutterBottom>
        <AttachMoney />
      </Typography>
    </Box>
  );
}
