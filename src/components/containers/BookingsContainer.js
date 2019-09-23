/**
 * Container to hold the bookings feature and assign the trip store to it
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import Bookings from '../bookings/Bookings';

const BookingsContainer = inject('trip')(
  observer(({ trip }) => {
    return <Bookings passengers={trip.passengers} />;
  }),
);

export default BookingsContainer;
