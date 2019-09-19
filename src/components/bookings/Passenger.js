import React from 'react';
import Box from '@material-ui/core/Box';
import { Avatar, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  bigAvatar: {
    margin: 1,
    width: 70,
    height: 70,
    border: '1px solid rgba(88,88,88,0.1)',
    'box-shadow': '2px 0px rgba(88,88,88,0.3)',
  },
});

export default function Passenger() {
  const classes = useStyles();
  return (
    <Box display='flex' flexWrap='wrap' p={1} mx={1}>
      <Box p={1} mx={1} alignItems='center'>
        <Avatar
          alt='Remy Sharp'
          src='/static/images/full-face-1.jpg'
          className={classes.bigAvatar}
        />
      </Box>
      <Box p={1} mx={1} xs={6}>
        <Typography variant='h6' gutterBottom>
          Monica Cupido
        </Typography>
      </Box>
    </Box>
  );
}
