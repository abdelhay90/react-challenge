/**
 * Trip statistics feature component
 */
import React from 'react';
import { Box } from '@material-ui/core';
import PassengersStats from './PassengersStats';
import StationsStatistics from './StationsStatistics';
import { STATION_OPERATION_TYPE } from '../../lib/constants';

function TripStatistics() {
  return (
    <>
      <Box display='flex' flexWrap='wrap' p={1} m={1}>
        <Box>
          <PassengersStats />
        </Box>
        <Box>
          <StationsStatistics type={STATION_OPERATION_TYPE.PICK_UP} />
        </Box>
        <Box>
          <StationsStatistics type={STATION_OPERATION_TYPE.CHECK_OUT} />
        </Box>
      </Box>
    </>
  );
}

export default TripStatistics;
