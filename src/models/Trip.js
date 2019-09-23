import { observable, action, computed } from 'mobx';
import groupBy from 'lodash/groupBy';
import Passenger from './Passenger';
import {
  PASSENGER_STATUS,
  PASSENGERS_MAX_CAPACITY,
  TRIP_STATUS,
} from '../lib/constants';

export default class Trip {
  id;

  @observable distance;

  @observable rateFare;

  @observable driverInfo;

  @observable path;

  @observable passengers = [];

  @observable tripStatus;

  @observable currentStop;

  constructor({
    id,
    passengers = [],
    distance,
    rateFare,
    driverInfo,
    path,
    tripStatus = TRIP_STATUS.NOT_STARTED,
  }) {
    this.id = id;
    this.passengers = passengers.map(item => new Passenger({ ...item }, this));
    this.distance = distance;
    this.rateFare = rateFare;
    this.driverInfo = driverInfo;
    this.path = path;
    this.currentStop = this.path.length > 0 ? this.path[0] : null;
    this.tripStatus = tripStatus;
  }

  @computed
  get route() {
    return {
      name:
        this.path.length !== 0
          ? `${this.path[0].stationName} - ${this.path[this.path.length - 1].stationName}`
          : 0,
      route: this.path.map(item => item.coordinates),
      routeStops: this.path,
      startPoint: this.path.length !== 0 ? this.path[0] : '',
      endPoint: this.path.length !== 0 ? this.path[this.path.length - 1] : '',
      currentStop: this.currentStop,
    };
  }

  @computed
  get isTripMaxCapacity() {
    return this.passengers.length >= PASSENGERS_MAX_CAPACITY;
  }

  @computed
  get passengersStats() {
    let allGroups = Object.keys(PASSENGER_STATUS).reduce(
      (accum, value) => ({ ...accum, [value]: [] }),
      {},
    );
    const calculatedGroups = groupBy(this.passengers, 'status');
    allGroups = { ...allGroups, ...calculatedGroups };
    return Object.keys(allGroups).map(key => ({
      x: key,
      y: allGroups[key].length,
    }));
  }

  getStationMap() {
    return this.path.reduce(
      (accum, value) => ({ ...accum, [value.stationId]: [] }),
      {},
    );
  }

  combineStationStats(allStations, calculated) {
    const newStatsMap = { ...allStations, ...calculated };
    return Object.keys(newStatsMap).map(key => ({
      x: this.path.filter(item => item.stationId === key)[0].stationName,
      y: newStatsMap[key].length,
    }));
  }

  @computed
  get stationPickupStats() {
    const allStations = this.getStationMap();
    const passengers = this.passengers.filter(
      passenger =>
        passenger.status !== PASSENGER_STATUS.MISSED &&
        passenger.status !== PASSENGER_STATUS.CANCELLED,
    );
    const stationGroups = groupBy(passengers, 'pickupStationId');
    return this.combineStationStats(allStations, stationGroups);
  }

  @computed
  get stationCheckoutStats() {
    const allStations = this.getStationMap();
    const passengers = this.passengers.filter(
      passenger => passenger.status === PASSENGER_STATUS.COMPLETED,
    );
    const stationGroups = groupBy(passengers, 'checkoutStationId');
    return this.combineStationStats(allStations, stationGroups);
  }

  @action.bound
  addPassenger(passenger) {
    if (this.passengers.length < 12)
      this.passengers.push(new Passenger({ ...passenger }, this));
  }

  @action.bound
  removePassenger(item) {
    this.passengers = this.passengers.filter(i => i !== item);
  }

  @action.bound
  startTrip() {
    this.tripStatus = TRIP_STATUS.STARTED;
  }

  @action.bound
  stopTrip() {
    this.tripStatus = TRIP_STATUS.FINISHED;
  }
}
