import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppToolBar from './core/AppToolBar';
import MainMap from './main-map/MainMap';
import TripInfo from './trip-info/TripInfo';
import Bookings from './bookings/Bookings';

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
  mainContainer: {
    padding: theme.spacing(8, 0, 6),
  },
  mapContainer: {
    'padding-top': '100px',
    'padding-right': '16px',
    'padding-left': '16px',
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppToolBar />
      <Container
        maxWidth='lg'
        component='main'
        className={`${classes.mainContainer} ${classes.mapContainer}`}
      >
        <MainMap />
      </Container>
      <Container
        maxWidth='lg'
        component='main'
        className={classes.mainContainer}
      >
        <TripInfo />
      </Container>
      <Container
        maxWidth='lg'
        component='main'
        className={classes.mainContainer}
      >
        <Bookings />
      </Container>
    </>
  );
}
