import React from 'react';
import Typography from '@material-ui/core/Typography';
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
      position='static'
      color='default'
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          className={classes.toolbarTitle}
        >
          SWVL
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
