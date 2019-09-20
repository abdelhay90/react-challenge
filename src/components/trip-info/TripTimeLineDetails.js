import React from 'react';
import { makeStyles, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  gradientBorder: {
    borderWidth: '3px',
    borderLeftStyle: 'solid',
    borderImage: 'linear-gradient(to bottom, pink, purple) 1 100%;',
    paddingLeft: '3px',
  },
}));

export default function TripTimeLineDetails({
  start = 'Triumph Square',
  end = 'Mohandeseen',
}) {
  const classes = useStyles();
  return (
    <Box className={classes.gradientBorder} m={1}>
      <Typography variant='h6' gutterBottom>
        {start}
      </Typography>
      <Typography variant='h6' gutterBottom>
        {end}
      </Typography>
    </Box>
  );
}
