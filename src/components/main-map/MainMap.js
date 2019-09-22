import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import { Box } from '@material-ui/core';
import { stops } from '../../lib/mock';
import {
  addGeoJSONLayer,
  createFeatureCollection,
  fitBounds,
} from '../../lib/mapUtils';
import {
  DEFAULT_LAYER_CIRCLE_PAINT,
  DEFAULT_LAYER_LINE_PAINT,
  DEFAULT_LAYER_SYMBOL_BUS_PAINT,
  LAYER_CIRCLE_TYPE,
  LAYER_LINE_TYPE,
  LAYER_SYMBOL_TYPE,
  MAP_TOKEN,
} from '../../lib/constants';
import TripStarter from './TripStarter';

export default class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: undefined,
      mapLoaded: false,
      viewport: {
        width: '100%',
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
      },
    };
  }

  mapLoaded = map => {
    const route = createFeatureCollection(
      [{ name: 'route1', coordinates: stops.map(item => item.coordinates) }],
      'LineString',
    );
    const routeStops = createFeatureCollection(stops, 'Point');
    const busCollection = createFeatureCollection([stops[0]], 'Point');

    addGeoJSONLayer({
      map,
      sourceOptions: { name: 'route', data: route },
      layerOptions: {
        id: 'route',
        source: 'route',
        type: LAYER_LINE_TYPE,
        layout: { visibility: 'visible' },
        paint: DEFAULT_LAYER_LINE_PAINT,
      },
    });

    addGeoJSONLayer({
      map,
      sourceOptions: { name: 'stops', data: routeStops },
      layerOptions: {
        id: 'stops',
        source: 'stops',
        type: LAYER_CIRCLE_TYPE,
        layout: { visibility: 'visible' },
        paint: DEFAULT_LAYER_CIRCLE_PAINT,
      },
    });

    addGeoJSONLayer({
      map,
      sourceOptions: { name: 'bus', data: busCollection },
      layerOptions: {
        id: 'bus',
        source: 'bus',
        type: LAYER_SYMBOL_TYPE,
        layout: DEFAULT_LAYER_SYMBOL_BUS_PAINT,
      },
    });
  };

  render() {
    const line = stops.map(item => item.coordinates);
    const { mapLoaded, viewport, map } = this.state;
    return (
      <div>
        <Box mb={1}>
          <TripStarter disabled={!mapLoaded} map={map} stops={stops} />
        </Box>
        <Box my={1}>
          <ReactMapGL
            mapboxApiAccessToken={MAP_TOKEN}
            {...viewport}
            onViewportChange={this.onViewportChange}
            onLoad={e => {
              this.setState({ map: e.target, mapLoaded: true });
              this.mapLoaded(e.target);
              fitBounds(e.target, line);
            }}
          />
        </Box>
      </div>
    );
  }
}
