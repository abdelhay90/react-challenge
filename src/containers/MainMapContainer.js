import React from 'react';
import { inject, observer } from 'mobx-react';
import MainMap from '../components/main-map/MainMap';

const MainMapContainer = inject('trip')(
  observer(({ trip }) => {
    return <MainMap route={trip.route} />;
  }),
);

export default MainMapContainer;
