import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import renderer from 'react-test-renderer';
import BookingsContainer from '../../../components/containers/BookingsContainer';
import Trip from '../../../models/Trip';
import { trip } from '../../../lib/mock';

describe('Bookings Component', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const currentTrip = new Trip({ ...trip });
    ReactDOM.render(
      <Provider trip={currentTrip}>
        <BookingsContainer />
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
          <BookingsContainer />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
