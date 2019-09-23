/**
 * container to trip info feature and assign the trip store to it
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import TripInfo from '../trip-info/TripInfo';

const TripInfoContainer = inject('trip')(
  observer(({ trip }) => {
    return (
      <TripInfo
        driverInfo={trip.driverInfo}
        rateFare={trip.rateFare}
        distance={trip.distance}
        route={trip.route}
      />
    );
  }),
);

export default TripInfoContainer;
