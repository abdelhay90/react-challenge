import { action, observable } from 'mobx';

export default class Passenger {
  id;

  name;

  @observable status;

  constructor({ id, name, status }) {
    this.id = id;
    this.name = name;
    this.status = status;
  }

  @action.bound
  updateStatus(newStatus) {
    this.status = newStatus;
  }
}
