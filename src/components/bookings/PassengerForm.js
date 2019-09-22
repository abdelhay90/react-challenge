import React from 'react';
import { inject } from 'mobx-react';
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { PAYMENT_METHOD } from '../../lib/constants';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  menu: {
    width: 200,
  },
}));

const availablePaymentMethod = Object.keys(PAYMENT_METHOD).map(item => ({
  method: item,
  value: item,
}));

const PassengerForm = inject('trip')(({ trip }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    customerName: '',
    mobileNumber: '',
    paymentMethod: 'CASH',
  });
  const handleChange = name => evt => {
    setValues({ ...values, [name]: evt.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    trip.addPassenger(values);
    setValues({
      name: '',
      mobileNumber: '',
      paymentMethod: 'CASH',
    });
  };
  return (
    <div className={classes.paper}>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          {/* customer name */}
          <Grid item xs={12}>
            <TextField
              autoComplete='cname'
              name='name'
              variant='outlined'
              required
              fullWidth
              id='name'
              label='Customer Name'
              autoFocus
              onChange={handleChange('name')}
            />
          </Grid>
          {/* mobile number */}
          <Grid item xs={12}>
            <TextField
              autoComplete='mobileNumber'
              name='mobileNumber'
              variant='outlined'
              required
              fullWidth
              id='mobileNumber'
              label='Mobile Number'
              autoFocus
              onChange={handleChange('mobileNumber')}
            />
          </Grid>

          {/* payment method */}
          <Grid item xs={12}>
            <TextField
              id='outlined-select-payment'
              select
              label='Select'
              value={values.paymentMethod}
              onChange={handleChange('paymentMethod')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText='Please select payment method'
              variant='outlined'
              name='paymentMethod'
            >
              {availablePaymentMethod.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.method}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        {/* submit */}
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={handleSubmit}
        >
          Add Booking
        </Button>
      </form>
    </div>
  );
});

export default PassengerForm;
