/**
 * it is a trip starter and simulator for marker movement on map
 */
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { createFeatureCollection } from '../../lib/mapUtils';
import { ANIMATION_STEPS } from '../../lib/constants';
import AppTripSimulator from '../../lib/AppTripSimulator';

let frameId = null;

function TripStarter({ trip, disabled, stops, map }) {
  const [started, setStarted] = useState(false);
  const simulator = new AppTripSimulator(trip);

  const startTrip = () => {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
      setStarted(false);
      simulator.off('location-change');
      return;
    }
    setStarted(true);

    // eslint-disable-next-line no-unused-vars
    let currentLocation = null;
    let arc = [];
    let startTime = 0;
    simulator.on('location-change', newArc => {
      arc = [...arc, ...newArc];
    });

    function animate(timestamp) {
      // animate function to set location
      const runtime = timestamp - startTime;
      const timeStep = Math.round(runtime);
      if (arc.length > 0) {
        currentLocation = arc[timeStep] || arc[arc.length - 1];
        const collection = createFeatureCollection(
          [{ coordinates: currentLocation }],
          'Point',
        );
        map.getSource('bus').setData(collection);
      }
      if (timeStep <= ANIMATION_STEPS * stops.length) {
        frameId = window.requestAnimationFrame(animate);
      }
    }

    window.cancelAnimationFrame(frameId);
    simulator.startSimulation();
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
