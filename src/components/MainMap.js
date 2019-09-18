import React from 'react';
import ReactMapboxGL from 'react-mapbox-gl';

const Map = ReactMapboxGL({
  accessToken:
    'pk.eyJ1IjoiYWhtZWQtYWJkZWxoYXkiLCJhIjoiY2swb2lkeGcyMGE1dDNlcnV3bzYyeXBqYSJ9.n0kF9SCChITXNQispwGnYQ',
});

export default function MainMap() {
  return (
    <div>
      {/* eslint-disable-next-line react/style-prop-object */}
      <Map style='mapbox://styles/mapbox/streets-v8' />
    </div>
  );
}
