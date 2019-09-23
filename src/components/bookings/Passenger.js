/**
 * Passenger card that hold the passenger identity, status, and payment method
 */
import React from 'react';
import Box from '@material-ui/core/Box';
import { Avatar, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  passenger: {
    minWidth: 340,
    maxWidth: 340,
  },
  bigAvatar: {
    margin: 1,
    width: 60,
    height: 60,
    border: '1px solid rgba(88,88,88,0.1)',
    'box-shadow': '2px 0px rgba(88,88,88,0.3)',
  },
});

export default function Passenger({
  id,
  name,
  status,
  paymentMethod,
  imageUrl,
}) {
  const classes = useStyles();
  return (
    <Box
      id={id}
      display='flex'
      flexWrap='wrap'
      p={1}
      mx={1}
      className={classes.passenger}
    >
      <Box p={1} mx={1} alignItems='center'>
        <Avatar alt={name} src={imageUrl} className={classes.bigAvatar}>
          {imageUrl === '' ? name[0] : ''}
        </Avatar>
      </Box>
      <Box p={1} mx={1} xs={6}>
        <Typography variant='h6' gutterBottom>
          {name}
        </Typography>
        {`${status} - ${paymentMethod}`}
      </Box>
    </Box>
  );
}
