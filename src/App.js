import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppToolBar from './components/AppToolBar';
import MainMap from './components/MainMap';
import TripInfo from './components/trip-info/TripInfo';
import Bookings from './components/bookings/Bookings';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppToolBar />
      <Container maxWidth='lg' component='main' className={classes.heroContent}>
        <MainMap />
      </Container>
      <Container maxWidth='lg' component='main'>
        <TripInfo />
      </Container>
      <Container maxWidth='lg' component='main' className={classes.heroContent}>
        <Bookings />
      </Container>
    </>
  );
}
