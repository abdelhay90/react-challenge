import { action, observable } from 'mobx';

export default class Passenger {
  id;

  name;

  paymentMethod;

  imageUrl;

  @observable status;

  constructor({ id, name, status, paymentMethod, imageUrl }, list) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.paymentMethod = paymentMethod;
    this.imageUrl = imageUrl;
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
