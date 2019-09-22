import React from 'react';
import { inject, observer } from 'mobx-react';
import Bookings from '../components/bookings/Bookings';

const BookingsContainer = inject('trip')(
  observer(({ trip }) => {
    return <Bookings passengers={trip.passengers} />;
  }),
);

export default BookingsContainer;
