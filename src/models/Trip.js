import { observable } from 'mobx';

export default class Trip {
  id;

  @observable passengers = [];
}
