import React from 'react';
import MapContainer from '../containers/MapContainer';

export default function MainMap() {
  return (
    <div>
      {/* eslint-disable-next-line react/style-prop-object */}
      <MapContainer
        style='mapbox://styles/mapbox/streets-v8'
        containerStyle={{
          height: '35vh',
          width: '100%',
        }}
      />
    </div>
  );
}
