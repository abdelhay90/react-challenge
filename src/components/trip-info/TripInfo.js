/**
 * holds all the trip information feature components
 */
import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import DriverInfo from './DriverInfo';
import TripTimeLineDetails from './TripTimeLineDetails';
import TripDetails from './TripDetails';

const useStyles = makeStyles(() => ({
  tripInfoBox: {
    width: 377,
  },
}));

export default function TripInfo({ driverInfo, route, distance, rateFare }) {
  const classes = useStyles();
  return (
    <>
      <Box px={1} mx={1}>
        <Typography variant='h5'>Trip Info</Typography>
      </Box>
      <Box display='flex' flexWrap='wrap' p={1} m={1}>
        <Box px={1} mx={1} className={classes.tripInfoBox}>
          <DriverInfo {...driverInfo} />
        </Box>
        <Box px={1} mx={1} className={classes.tripInfoBox}>
          <TripTimeLineDetails
            start={route.startPoint.stationName}
            end={route.endPoint.stationName}
          />
        </Box>
        <Box px={1} mx={1} className={classes.tripInfoBox}>
          <TripDetails distance={distance} baseFare={rateFare} />
        </Box>
      </Box>
    </>
  );
}
