import { action, observable } from 'mobx';
import uniqueId from 'lodash/uniqueId';
import { PASSENGER_STATUS } from '../lib/constants';

export default class Passenger {
  id;

  name;

  paymentMethod;

  imageUrl;

  @observable status;

  constructor(
    {
      id = uniqueId(),
      name,
      status = PASSENGER_STATUS.WAITING,
      paymentMethod,
      mobileNumber,
      imageUrl = '',
    },
    list,
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.paymentMethod = paymentMethod;
    this.imageUrl = imageUrl;
    this.mobileNumber = mobileNumber;
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
