import React from 'react';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

export default function AppToolBar() {
  const classes = useStyles();
  return (
    <AppBar
      position='fixed'
      color='default'
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <img
          alt='logo'
          src='/static/images/swvl-new-logo.png'
          width='90'
          height='36'
        />
      </Toolbar>
    </AppBar>
  );
}
