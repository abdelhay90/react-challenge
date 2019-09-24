/**
 * create to simulate actual driver movement and his location update to update an use it on map
 */
import { EventEmitter } from 'events';
import { observe } from 'mobx';
import { calculateSmoothRouteArc } from './mapUtils';
import { ANIMATION_STEPS } from './constants';

class AppTripSimulator extends EventEmitter {
  constructor(trip) {
    super();
    this.trip = trip;
    this.init();
  }

  /**
   * init to observe the changes happened in the driver current location then calculate the
   * interpolated line between two point to make it easier while apply animation  on map
   */
  init() {
    observe(this.trip.driverInfo, change => {
      // to observe and detect changes to drivers location simulate smooth movement on map
      if (change.name === 'currentLocation') {
        const arc = calculateSmoothRouteArc(
          [change.oldValue, change.newValue],
          {
            distanceOptions: { units: 'feet' },
            steps: ANIMATION_STEPS,
          },
        );
        this.emit('location-change', arc);
      }
    });
  }

  /**
   * simulating driver push its location and setting current location
   */
  startSimulation() {
    const path = [...this.trip.path].reverse();
    // remove first location because it was bound when creating the trip path
    path.pop();

    const intervalId = setInterval(() => {
      const loc = path.pop();
      this.trip.driverInfo.currentLocation = loc.coordinates;
      if (path.length === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
}

export default AppTripSimulator;
