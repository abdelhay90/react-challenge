import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import { Button, Box } from '@material-ui/core';
import { stops } from '../../lib/mock';
import {
  addGeoJSONLayer,
  calculateSmoothRouteArc,
  createFeature,
  createFeatureCollection,
  fitBounds,
} from '../../lib/mapUtils';
import {
  ANIMATION_STEPS,
  DEFAULT_LAYER_CIRCLE_PAINT,
  DEFAULT_LAYER_LINE_PAINT,
  DEFAULT_LAYER_SYMBOL_BUS_PAINT,
  GEOMETRY_POINT_TYPE,
  LAYER_CIRCLE_TYPE,
  LAYER_LINE_TYPE,
  LAYER_SYMBOL_TYPE,
  MAP_TOKEN,
} from '../../lib/constants';

let frameId = null;

export default class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: undefined,
      mapLoaded: false,
      tripStarted: false,
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

  startTrip = () => {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
      this.setState({ tripStarted: false });
      return;
    }
    this.setState({ tripStarted: true });

    const locations = stops.map(item =>
      createFeature(item, GEOMETRY_POINT_TYPE, item.coordinates),
    );
    if (!locations.length) {
      // exit if no cords in array
      return;
    }
    const { map } = this.state;
    // eslint-disable-next-line no-unused-vars
    let currentLocation = null;
    let arc = null;
    let startTime = 0;

    arc = calculateSmoothRouteArc(
      locations.map(loc => loc.geometry.coordinates),
      {
        distanceOptions: { units: 'feet' },
        steps: ANIMATION_STEPS,
      },
    );

    function animate(timestamp) {
      // animate function to set location
      const runtime = timestamp - startTime;
      const timeStep = Math.round(runtime);
      currentLocation = arc[timeStep] || arc[arc.length - 1];
      const collection = createFeatureCollection(
        [{ coordinates: currentLocation }],
        'Point',
      );
      map.getSource('bus').setData(collection);
      if (timeStep <= ANIMATION_STEPS) {
        frameId = window.requestAnimationFrame(animate);
      }
    }

    window.cancelAnimationFrame(frameId);
    frameId = window.requestAnimationFrame(timeStamp => {
      startTime = timeStamp;
      animate(timeStamp);
    });
  };

  onViewportChange = () => {
    // this.setState({ viewport: vp });
  };

  render() {
    const line = stops.map(item => item.coordinates);
    const { mapLoaded, viewport, tripStarted } = this.state;
    return (
      <div>
        <Box mb={1}>
          <Button
            variant='contained'
            color={!tripStarted ? 'secondary' : 'primary'}
            disabled={!mapLoaded}
            onClick={this.startTrip}
          >
            {!tripStarted ? 'Start Trip' : 'Stop Trip'}
          </Button>
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
