import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from 'react-vis';
import { inject } from 'mobx-react';
import { Typography } from '@material-ui/core';
import { STATION_OPERATION_TYPE } from '../../lib/constants';

const StationsStatistics = inject('trip')(({ trip, type }) => {
  let subtitle = '';
  let stats = [];
  switch (type) {
    case STATION_OPERATION_TYPE.PICK_UP:
      subtitle = 'Picked Up Passengers Per Station Statistics';
      stats = trip.stationPickupStats;
      break;
    case STATION_OPERATION_TYPE.CHECK_OUT:
    default:
      subtitle = 'Checked out Passengers Per Station Statistics';
      stats = trip.stationCheckoutStats;
      break;
  }
  return (
    <div>
      <XYPlot margin={{ bottom: 70 }} xType='ordinal' width={300} height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-60} />
        <YAxis />
        <VerticalBarSeries data={stats} />
      </XYPlot>
      <Typography variant='caption'>{subtitle}</Typography>
    </div>
  );
});

export default StationsStatistics;
