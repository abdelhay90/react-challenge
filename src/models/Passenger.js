import { action, observable } from 'mobx';

export default class Passenger {
  id;

  name;

  paymentMethod;

  @observable status;

  constructor({ id, name, status, paymentMethod }, list) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.paymentMethod = paymentMethod;
    this.list = list;
  }

  @action.bound
  updateStatus(newStatus) {
    this.status = newStatus;
  }

  @action.bound
  updatePaymentMethod(newPaymentMethod) {
    this.paymentMethod = newPaymentMethod;
  }
}
