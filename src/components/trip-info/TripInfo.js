import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import CaptainInfo from './CaptainInfo';
import TripTimeLineDetails from './TripTimeLineDetails';
import TripDetails from './TripDetails';

const useStyles = makeStyles(() => ({
  tripInfoBox: {
    width: 300,
  },
}));

export default function TripInfo() {
  const classes = useStyles();
  return (
    <>
      <Box px={1} mx={1}>
        <Typography variant='h5'>Trip Info</Typography>
      </Box>
      <Box display='flex' flexWrap='wrap' p={1} m={1}>
        <Box p={1} mx={1} className={classes.tripInfoBox}>
          <CaptainInfo />
        </Box>
        <Box p={1} mx={1} className={classes.tripInfoBox}>
          <TripTimeLineDetails />
        </Box>
        <Box p={1} mx={1} className={classes.tripInfoBox}>
          <TripDetails />
        </Box>
      </Box>
    </>
  );
}
