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

export default function CaptainInfo() {
  const classes = useStyles();
  return (
    <Box display='flex' flexWrap='wrap' p={1} m={1}>
      <Box p={1} mx={1} alignItems='center'>
        <Grid container justify='flex-start' alignItems='center'>
          <Avatar
            alt='Remy Sharp'
            src='/static/images/Toyota-HiAce.jpg'
            className={`${classes.bigAvatar} ${classes.car}`}
          />
          <Avatar
            alt='Remy Sharp'
            src='/static/images/driver-1.jpg'
            className={`${classes.bigAvatar} ${classes.driver}`}
          />
        </Grid>
      </Box>
      <Box p={1} mx={1} xs={6}>
        <Typography variant='h6' gutterBottom>
          Captain Sapoo
        </Typography>
        TOYOTA HiAce - QA 2273
      </Box>
    </Box>
  );
}