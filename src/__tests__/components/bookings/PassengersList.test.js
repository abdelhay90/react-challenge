import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'mobx-react';
import renderer from 'react-test-renderer';
import Trip from '../../../models/Trip';
import { trip } from '../../../lib/mock';
import { PassengerList } from '../../../components/bookings';

describe('Passenger List Component', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const currentTrip = new Trip({ ...trip });
    ReactDOM.render(
      <Provider trip={currentTrip}>
        <PassengerList passengers={currentTrip.passengers} />
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
          <PassengerList passengers={currentTrip.passengers} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show more or less', () => {
    const currentTrip = new Trip({ ...trip });
    const wrapper = mount(
      <Provider trip={currentTrip}>
        <PassengerList passengers={currentTrip.passengers} />
      </Provider>,
    );
    expect(
      wrapper
        .find('button')
        .last()
        .getDOMNode().textContent,
    ).toEqual('View More');
    const evt = new window.Event('click', { bubbles: true });
    evt.simulated = true;

    wrapper
      .find('button')
      .last()
      .simulate('click');
    expect(
      wrapper
        .find('button')
        .last()
        .getDOMNode().textContent,
    ).toEqual('View Less');
  });
});
