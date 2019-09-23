import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import './index.css';
import App from './components/App';
import theme from './theme/theme';
import * as serviceWorker from './serviceWorker';
import { Trip } from './models';
import Api from './lib/api';

const renderApp = store => {
  ReactDOM.render(
    <Provider trip={store}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
  );
};

const init = async () => {
  const trips = await Api.getAllTrips();
  const currentTrip = new Trip({ ...trips[0] });
  renderApp(currentTrip);
};

init();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
