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
    this.passengers = passengers.map(item => new Passenger({ ...item }));
    this.distance = distance;
    this.rateFare = rateFare;
    this.driverInfo = driverInfo;
    this.path = path;
    this.currentStop = this.path.length > 0 ? this.path[0] : null;
    this.tripStatus = tripStatus;
  }

  /**
   * computed property returns the route object that help in binding to screen
   * @returns {{endPoint: string, route: *, routeStops: *, name: (string|number), startPoint: string, currentStop: *}}
   */
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
  get stationsMap() {
    return this.path.reduce(
      (accum, value) => ({ ...accum, [value.stationId]: value }),
      {},
    );
  }

  /**
   * computed property checks if car of current trip has reached max capacity
   * @returns {boolean}
   */
  @computed
  get isTripMaxCapacity() {
    return this.passengers.length >= PASSENGERS_MAX_CAPACITY;
  }

  /**
   * computed property returns the passengers status statistics during trip
   * @returns {{x: *, y: *}[]}
   */
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

  /**
   * helper function that create the station map that can hold statistics of passengers per each station
   * @returns {*}
   */
  _getStationMap() {
    return this.path.reduce(
      (accum, value) => ({ ...accum, [value.stationId]: [] }),
      {},
    );
  }

  /**
   * combine the all map of station with filled with zero and the new station map statistics
   * @param allStations
   * @param calculated
   * @returns {{x: *, y: *}[]}
   */
  _combineStationStats(allStations, calculated) {
    const newStatsMap = { ...allStations, ...calculated };
    return Object.keys(newStatsMap).map(key => ({
      x: this.path.filter(item => item.stationId === key)[0].stationName,
      y: newStatsMap[key].length,
    }));
  }

  /**
   * computed property return the statistics of picked up passengers per each station
   * @returns {{x: *, y: *}[]}
   */
  @computed
  get stationPickupStats() {
    const allStations = this._getStationMap();
    const passengers = this.passengers.filter(
      passenger =>
        passenger.status !== PASSENGER_STATUS.MISSED &&
        passenger.status !== PASSENGER_STATUS.CANCELLED,
    );
    const stationGroups = groupBy(passengers, 'pickupStationId');
    return this._combineStationStats(allStations, stationGroups);
  }

  /**
   * computed property return the statistics of checked out passengers per each station
   * @returns {{x: *, y: *}[]}
   */
  @computed
  get stationCheckoutStats() {
    const allStations = this._getStationMap();
    const passengers = this.passengers.filter(
      passenger => passenger.status === PASSENGER_STATUS.COMPLETED,
    );
    const stationGroups = groupBy(passengers, 'checkoutStationId');
    return this._combineStationStats(allStations, stationGroups);
  }

  /**
   * action to add new passenger to passengers list
   * @param passenger
   */
  @action.bound
  addPassenger(passenger) {
    if (this.passengers.length < 12)
      this.passengers.push(new Passenger({ ...passenger }));
  }

  /**
   * action to remove existing passenger from passengers list
   * @param item
   */
  @action.bound
  removePassenger(item) {
    this.passengers = this.passengers.filter(i => i !== item);
  }

  /**
   * action to set start trip status
   */
  @action.bound
  startTrip() {
    this.tripStatus = TRIP_STATUS.STARTED;
  }

  /**
   * action to set stop trip status
   */
  @action.bound
  stopTrip() {
    this.tripStatus = TRIP_STATUS.FINISHED;
  }
}
