import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import AppToolBar from './core/AppToolBar';
import {
  MainMapContainer,
  TripInfoContainer,
  BookingsContainer,
} from '../containers';

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
        <MainMapContainer />
      </Container>
      <Container
        maxWidth='lg'
        component='main'
        className={classes.mainContainer}
      >
        <TripInfoContainer />
      </Container>
      <Container
        maxWidth='lg'
        component='main'
        className={classes.mainContainer}
      >
        <BookingsContainer />
      </Container>
    </>
  );
}
