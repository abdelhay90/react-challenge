import { observable, action } from 'mobx';
import Passenger from './Passenger';

export default class Trip {
  id;

  distance;

  rateFare;

  driverInfo;

  path;

  @observable passengers = [];

  constructor({ id, passengers, distance, rateFare, driverInfo, path }) {
    this.id = id;
    this.passengers = passengers;
    this.distance = distance;
    this.rateFare = rateFare;
    this.driverInfo = driverInfo;
    this.path = path;
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
