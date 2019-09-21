import { observable, action, computed } from 'mobx';
import Passenger from './Passenger';

export default class Trip {
  id;

  @observable distance;

  @observable rateFare;

  @observable driverInfo;

  @observable path;

  @observable passengers = [];

  constructor({ id, passengers, distance, rateFare, driverInfo, path }) {
    this.id = id;
    this.passengers = passengers;
    this.distance = distance;
    this.rateFare = rateFare;
    this.driverInfo = driverInfo;
    this.path = path;
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
    };
  }

  @action.bound
  addPassenger(passenger) {
    this.items.push(new Passenger(passenger, this));
  }

  @action.bound
  removePassenger(item) {
    this.items = this.items.filter(i => i !== item);
  }
}
