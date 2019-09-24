/**
 * holds the map and its features as main feature component
 */
import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import { Box } from '@material-ui/core';
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
import BusMarker from './bus.png';

export default class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: undefined,
      mapLoaded: false,
      viewport: {
        width: '100%',
        height: 400,
        bearing: 0,
        pitch: 0,
        zoom: 8,
        scrollZoom: true,
      },
    };
  }

  mapLoaded = async map => {
    map.scrollZoom.enable();
    map.boxZoom.enable();
    map.dragPan.enable();

    // map.addImage('pin-bus', pin)
    const { route } = this.props;
    const routeCollection = createFeatureCollection(
      [
        {
          name: 'route1',
          coordinates: route.routeStops.map(item => item.coordinates),
        },
      ],
      'LineString',
    );
    const routeStops = createFeatureCollection(route.routeStops, 'Point');

    const busCollection = createFeatureCollection(
      [route.routeStops[0]],
      'Point',
    );

    map.loadImage(BusMarker, (error, image) => {
      // eslint-disable-next-line no-param-reassign
      image.width = 25;
      // eslint-disable-next-line no-param-reassign
      image.height = 25;
      map.addImage('pin-bus', image);

      addGeoJSONLayer({
        map,
        sourceOptions: { name: 'route', data: routeCollection },
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
    });
  };

  render() {
    const { route, trip } = this.props;
    const line = route.routeStops.map(item => item.coordinates);
    const { mapLoaded, viewport, map } = this.state;
    return (
      <>
        <TripStarter
          disabled={!mapLoaded}
          map={map}
          stops={route.routeStops}
          trip={trip}
        />
        <Box m={1} p={1}>
          <ReactMapGL
            mapboxApiAccessToken={MAP_TOKEN}
            mapStyle='mapbox://styles/mapbox/dark-v9'
            {...viewport}
            onLoad={e => {
              this.setState({ map: e.target, mapLoaded: true });
              e.target._interactive = true;
              this.mapLoaded(e.target);
              fitBounds(e.target, line);
            }}
          />
        </Box>
      </>
    );
  }
}
