import React from 'react';
import { inject } from 'mobx-react';
import { Paper, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const PassengersPayslips = inject('trip')(({ trip }) => {
  const classes = useStyles();
  const { stationsMap, passengers } = trip;
  const totalFees = passengers.reduce(
    (accum, val) => accum + val.chargedFees,
    0,
  );
  return (
    <>
      <Paper className={classes.paper}>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Pick Up Station</TableCell>
              <TableCell>Checkout Station</TableCell>
              <TableCell align='right'>Charge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passengers.map(row => (
              <TableRow key={row.id}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell>
                  {stationsMap[row.pickupStationId].stationName}
                </TableCell>
                <TableCell>
                  {stationsMap[row.checkoutStationId].stationName}
                </TableCell>
                <TableCell align='right'>{`$${row.chargedFees}`}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={1} />
              <TableCell>
                <b>Total</b>
              </TableCell>
              <TableCell align='right'>
                <b>{`$${totalFees}`}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      {/* <List>
          {
            trip.passengers.map((passenger) => (
              <ListItem key={passenger.id}>
                <ListItemAvatar>
                  <Avatar alt={passenger.name} src={passenger.imageUrl} className={classes.avatar}>
                    {passenger.imageUrl === "" ? passenger.name[0].toUpperCase() : ""}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${passenger.name} - $ ${passenger.chargedFees}`}
                              secondary={`from ${stationsMap[passenger.pickupStationId].stationName} to ${stationsMap[passenger.checkoutStationId].stationName}`}/>
              </ListItem>
            ))
          }
        </List> */}
    </>
  );
});

export default PassengersPayslips;
