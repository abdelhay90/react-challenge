import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'mobx-react';
import { AddPassenger } from '../../../components/bookings';
import Trip from '../../../models/Trip';
import { trip } from '../../../lib/mock';

describe('Add Passenger Component', () => {
  it('should render without crashing', () => {
    const currentTrip = new Trip({ ...trip });
    const wrapper = mount(
      <Provider trip={currentTrip}>
        <AddPassenger />
      </Provider>,
    );
    expect(
      wrapper.find('.MuiButtonBase-root').map(el => el.getDOMNode()),
    ).toBeTruthy();
  });

  it('should open dialog function called', () => {
    const container = document.createElement('div');
    const currentTrip = new Trip({ ...trip });
    ReactDOM.render(
      <Provider trip={currentTrip}>
        <AddPassenger />
      </Provider>,
      container,
    );
    const button = container.querySelector('.MuiButtonBase-root');
    const spy = jest.spyOn(button, 'onclick');
    button.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    expect(spy).toHaveBeenCalled();
  });

  it('should open dialog', () => {
    const currentTrip = new Trip({ ...trip });
    const wrapper = mount(
      <Provider trip={currentTrip}>
        <AddPassenger />
      </Provider>,
    );
    const evt = new window.Event('input', { bubbles: true });
    evt.simulated = true;
    wrapper
      .find('button')
      .last()
      .simulate('click');
    expect(wrapper.find('.MuiDialog-root')).toHaveLength(2);
  });

  it('should not open dialog', () => {
    const currentTrip = new Trip({ ...trip });
    currentTrip.addPassenger({
      id: '5d865ee580c33a45ed14c2ed',
      name: 'Cook Best',
      status: 'CANCELLED',
      paymentMethod: 'CREDIT',
      imageUrl: '/static/images/full-face-1.jpg',
      pickupStationId: '5d865ee507bfe196bac94ff3',
      checkoutStationId: '5d87566598u4f96a85fa3dbc',
    });
    const wrapper = mount(
      <Provider trip={currentTrip}>
        <AddPassenger />
      </Provider>,
    );
    const evt = new window.Event('input', { bubbles: true });
    evt.simulated = true;
    wrapper
      .find('button')
      .last()
      .simulate('click', evt);
    expect(wrapper.find('.MuiDialog-root')).toHaveLength(1);
  });
});
