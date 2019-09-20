import React from 'react';
import { Grid, Avatar, Typography, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  bigAvatar: {
    margin: 1,
    width: 70,
    height: 70,
    border: '1px solid rgba(88,88,88,0.1)',
    'box-shadow': '2px 0px rgba(88,88,88,0.3)',
  },
  driver: {
    'z-index': 9,
    margin: '-20px',
  },
  car: {
    'z-index': '10',
  },
});

export default function DriverInfo({
  carModel = 'TOYOTA HiAce - QA 2273',
  carImageUrl = '/static/images/Toyota-HiAce.jpg',
  driverName = 'Captain Saboo',
  driverImageUrl = '/static/images/driver-1.jpg',
}) {
  const classes = useStyles();
  return (
    <Box display='flex' flexWrap='wrap' m={1}>
      <Box mx={1} alignItems='center'>
        <Grid container justify='flex-start' alignItems='center'>
          <Avatar
            alt={carModel}
            src={carImageUrl}
            className={`${classes.bigAvatar} ${classes.car}`}
          />
          <Avatar
            alt={driverName}
            src={driverImageUrl}
            className={`${classes.bigAvatar} ${classes.driver}`}
          />
        </Grid>
      </Box>
      <Box px={1} mx={1}>
        <Typography variant='h6' gutterBottom>
          {driverName}
        </Typography>
        {carModel}
      </Box>
    </Box>
  );
}