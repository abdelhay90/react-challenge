import { Trip } from '../../models';
import { trip } from '../../lib/mock';
import { TRIP_STATUS } from '../../lib/constants';

describe('Trip Model', () => {
  it('should be initialized successfully', () => {
    const currentTrip = new Trip({ ...trip });
    expect(currentTrip).toBeTruthy();
  });

  it('should have passenger', () => {
    const currentTrip = new Trip({ ...trip });
    expect(currentTrip.passengers).toHaveLength(11);
  });

  it('should have less than max capacity', () => {
    const currentTrip = new Trip({ ...trip });
    expect(currentTrip.isTripMaxCapacity).toBeFalsy();
  });

  it('should add new passenger to flight', () => {
    const currentTrip = new Trip({ ...trip });
    currentTrip.addPassenger({
      name: 'Cook Best',
      paymentMethod: 'CREDIT',
      imageUrl: '/static/images/full-face-1.jpg',
      pickupStationId: '5d865ee507bfe196bac94ff3',
      checkoutStationId: '5d87566598u4f96a85fa3dbc',
    });
    expect(currentTrip.isTripMaxCapacity).toBeTruthy();
    expect(currentTrip.passengers).toHaveLength(12);
  });

  it('should remove existing passenger from flight', () => {
    const currentTrip = new Trip({ ...trip });
    const passenger = currentTrip.passengers[2];
    currentTrip.removePassenger(passenger);
    expect(currentTrip.isTripMaxCapacity).toBeFalsy();
    expect(currentTrip.passengers).toHaveLength(10);
  });

  it('should start flight', () => {
    const currentTrip = new Trip({ ...trip });
    currentTrip.startTrip();
    expect(currentTrip.tripStatus).toEqual(TRIP_STATUS.STARTED);
  });

  it('should stop flight', () => {
    const currentTrip = new Trip({ ...trip });
    currentTrip.stopTrip();
    expect(currentTrip.tripStatus).toEqual(TRIP_STATUS.FINISHED);
  });

  it('should return computed property "route"', () => {
    const currentTrip = new Trip({ ...trip });
    const { route } = currentTrip;
    expect(route.name).toEqual('Talaat Harb Axis - ElThawra St.');
  });

  it('should collect passengers stats', () => {
    const currentTrip = new Trip({ ...trip });
    const { passengersStats } = currentTrip;
    expect(passengersStats).toEqual([
      { x: 'WAITING', y: 0 },
      { x: 'CHECKED_IN', y: 0 },
      { x: 'MISSED', y: 3 },
      { x: 'CANCELLED', y: 3 },
      { x: 'COMPLETED', y: 5 },
    ]);
  });

  it('should collect station pick up stats', () => {
    const currentTrip = new Trip({ ...trip });
    const { stationPickupStats } = currentTrip;
    expect(stationPickupStats).toEqual([
      { x: 'Talaat Harb Axis', y: 5 },
      { x: 'Omar Ibn Abdelaziz', y: 0 },
      { x: 'Southern Teseen', y: 0 },
      { x: 'AlMoshir Tantawy Axis', y: 0 },
      { x: 'El-Shaikh Kamel Khedr', y: 0 },
      { x: 'Ahmed ElZomor', y: 0 },
      { x: 'Mostafa ElNahas', y: 0 },
      { x: 'Makram Ebid', y: 0 },
      { x: 'Makrem Ebeid Ext', y: 0 },
      { x: 'ElThawra St.', y: 0 },
    ]);
  });

  it('should collect station checkout stats', () => {
    const currentTrip = new Trip({ ...trip });
    const { stationCheckoutStats } = currentTrip;
    expect(stationCheckoutStats).toEqual([
      { x: 'Talaat Harb Axis', y: 0 },
      { x: 'Omar Ibn Abdelaziz', y: 0 },
      { x: 'Southern Teseen', y: 0 },
      { x: 'AlMoshir Tantawy Axis', y: 0 },
      { x: 'El-Shaikh Kamel Khedr', y: 0 },
      { x: 'Ahmed ElZomor', y: 0 },
      { x: 'Mostafa ElNahas', y: 2 },
      { x: 'Makram Ebid', y: 0 },
      { x: 'Makrem Ebeid Ext', y: 1 },
      { x: 'ElThawra St.', y: 2 },
    ]);
  });
});
