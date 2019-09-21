import React from 'react';
import { inject, observer } from 'mobx-react';
import TripInfo from '../components/trip-info/TripInfo';

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
