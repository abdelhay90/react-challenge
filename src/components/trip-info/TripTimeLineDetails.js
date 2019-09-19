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

export default function TripTimeLineDetails() {
  const classes = useStyles();
  return (
    <Box className={classes.gradientBorder} p={1} m={1}>
      <Typography variant='h6' gutterBottom>
        Triumph Square
      </Typography>
      <Typography variant='h6' gutterBottom>
        Mohandeseen
      </Typography>
    </Box>
  );
}
