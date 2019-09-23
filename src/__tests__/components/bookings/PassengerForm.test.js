import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'mobx-react';
import renderer from 'react-test-renderer';
import Trip from '../../../models/Trip';
import { trip } from '../../../lib/mock';
import { PassengerForm } from '../../../components/bookings';

describe('Passenger Form Component', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const currentTrip = new Trip({ ...trip });
    ReactDOM.render(
      <Provider trip={currentTrip}>
        <PassengerForm />
      </Provider>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('should match snapshot', () => {
    const currentTrip = new Trip({ ...trip });
    const tree = renderer
      .create(
        <Provider trip={currentTrip}>
          <PassengerForm />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should change values in inputs', () => {
    const currentTrip = new Trip({ ...trip });
    const wrapper = mount(
      <Provider trip={currentTrip}>
        <PassengerForm />
      </Provider>,
    );
    const evt = new window.Event('input', { bubbles: true });
    evt.simulated = true;
    wrapper
      .find("input[id='name']")
      .last()
      .getDOMNode().value = 'ahmed abdelhay';
    wrapper
      .find("input[id='name']")
      .last()
      .simulate('change');
    wrapper
      .find("input[id='mobileNumber']")
      .last()
      .getDOMNode().value = '010042651856';
    wrapper
      .find("input[id='mobileNumber']")
      .last()
      .simulate('change');
    expect(
      wrapper
        .find("input[id='name']")
        .last()
        .getDOMNode().value,
    ).toEqual('ahmed abdelhay');
    expect(
      wrapper
        .find("input[id='mobileNumber']")
        .last()
        .getDOMNode().value,
    ).toEqual('010042651856');
  });
});
