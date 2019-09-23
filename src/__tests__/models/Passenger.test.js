import { Passenger } from '../../models';
import { passengers } from '../../lib/mock';
import { PASSENGER_STATUS, PAYMENT_METHOD } from '../../lib/constants';

describe('Passenger Model', () => {
  it('should be initialized without crashing', () => {
    const currentPassenger = new Passenger({ ...passengers[0] });
    expect(currentPassenger).toBeTruthy();
  });

  it('should update passenger status', () => {
    const currentPassenger = new Passenger({ ...passengers[0] });
    expect(currentPassenger.status).toEqual(PASSENGER_STATUS.COMPLETED);
    currentPassenger.updateStatus(PASSENGER_STATUS.CHECKED_IN);
    expect(currentPassenger.status).toEqual(PASSENGER_STATUS.CHECKED_IN);
  });

  it('should update passenger payment method', () => {
    const currentPassenger = new Passenger({ ...passengers[0] });
    expect(currentPassenger.paymentMethod).toEqual(PAYMENT_METHOD.CASH);
    currentPassenger.updatePaymentMethod(PAYMENT_METHOD.CREDIT);
    expect(currentPassenger.paymentMethod).toEqual(PAYMENT_METHOD.CREDIT);
  });
});
