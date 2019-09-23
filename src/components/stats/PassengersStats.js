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

const PassengersStats = inject('trip')(({ trip }) => {
  return (
    <div>
      <XYPlot margin={{ bottom: 70 }} xType='ordinal' width={300} height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-45} />
        <YAxis />
        <VerticalBarSeries data={trip.passengersStats} />
      </XYPlot>
      <Typography variant='caption'>Passengers Statistics</Typography>
    </div>
  );
});

export default PassengersStats;
