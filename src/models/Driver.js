import { observable } from 'mobx';
import uniqueId from 'lodash/uniqueId';

export default class Passenger {
  id;

  driverName;

  carModel;

  carImageUrl;

  driverImageUrl;

  plateNumber;

  @observable currentLocation;

  constructor({
    id = uniqueId(),
    currentLocation = [],
    carModel = '',
    carImageUrl = '/static/images/Toyota-HiAce.jpg',
    driverName = '',
    driverImageUrl = '/static/images/driver-1.jpg',
    plateNumber = '',
  }) {
    this.id = id;
    this.currentLocation = currentLocation;
    this.carModel = carModel;
    this.carImageUrl = carImageUrl;
    this.driverName = driverName;
    this.driverImageUrl = driverImageUrl;
    this.plateNumber = plateNumber;
  }
}
