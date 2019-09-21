import React from 'react';
import { inject, observer } from 'mobx-react';
import MainMap from '../components/main-map/MainMap';

const MapContainer = inject('trip')(
  observer(trip => {
    return <MainMap path={trip.path} />;
  }),
);

export default MapContainer;
