/**
 * it is a trip starter and simulator for marker movement on map
 */
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import {
  calculateSmoothRouteArc,
  createFeature,
  createFeatureCollection,
} from '../../lib/mapUtils';
import { ANIMATION_STEPS, GEOMETRY_POINT_TYPE } from '../../lib/constants';

let frameId = null;
function TripStarter({ disabled, stops, map }) {
  const [started, setStarted] = useState(false);

  const startTrip = () => {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
      setStarted(false);
      return;
    }
    setStarted(true);

    const locations = stops.map(item =>
      createFeature(item, GEOMETRY_POINT_TYPE, item.coordinates),
    );
    if (!locations.length) {
      // exit if no coords in array
      return;
    }

    // eslint-disable-next-line no-unused-vars
    let currentLocation = null;
    let arc = null;
    let startTime = 0;

    arc = calculateSmoothRouteArc(
      locations.map(loc => loc.geometry.coordinates),
      {
        distanceOptions: { units: 'feet' },
        steps: ANIMATION_STEPS,
      },
    );

    function animate(timestamp) {
      // animate function to set location
      const runtime = timestamp - startTime;
      const timeStep = Math.round(runtime);
      currentLocation = arc[timeStep] || arc[arc.length - 1];
      const collection = createFeatureCollection(
        [{ coordinates: currentLocation }],
        'Point',
      );
      map.getSource('bus').setData(collection);
      if (timeStep <= ANIMATION_STEPS) {
        frameId = window.requestAnimationFrame(animate);
      }
    }

    window.cancelAnimationFrame(frameId);
    frameId = window.requestAnimationFrame(timeStamp => {
      startTime = timeStamp;
      animate(timeStamp);
    });
  };

  return (
    <>
      <Button
        variant='contained'
        color={!started ? 'secondary' : 'primary'}
        disabled={disabled}
        onClick={startTrip}
      >
        {!started ? 'Start Trip' : 'Stop Trip'}
      </Button>
    </>
  );
}

export default TripStarter;
