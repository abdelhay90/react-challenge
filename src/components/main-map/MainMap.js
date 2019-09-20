import React, { Component } from 'react';
import { Button, Box } from '@material-ui/core';
import { Feature, Layer } from 'react-mapbox-gl';
import MapContainer from '../../containers/MapContainer';
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
  GEOMETRY_POINT_TYPE,
  LAYER_CIRCLE_TYPE,
  LAYER_LINE_TYPE,
  LAYER_SYMBOL_TYPE,
} from '../../lib/constants';

let frameId = null;

export default class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: undefined,
      mapLoaded: false,
    };
  }

  mapLoaded = map => {
    const routeStops = createFeatureCollection(stops, 'Point');
    const busCollection = createFeatureCollection([stops[0]], 'Point');

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
        layout: {
          'icon-image': 'airport-15',
          'icon-rotate': ['get', 'bearing'],
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
        },
      },
    });
  };

  startTrip = () => {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
      return;
    }
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

  render() {
    const line = stops.map(item => item.coordinates);
    const { mapLoaded } = this.state;
    return (
      <div>
        <Box mb={1}>
          <Button
            variant='contained'
            color='secondary'
            disabled={!mapLoaded}
            onClick={this.startTrip}
          >
            Start Trip
          </Button>
        </Box>
        <Box my={1}>
          <MapContainer
            style='mapbox://styles/mapbox/streets-v8'
            containerStyle={{
              height: '35vh',
              width: '100%',
            }}
            onStyleLoad={map => {
              this.setState({ map, mapLoaded: true });
              this.mapLoaded(map);
              fitBounds(map, line);
            }}
          >
            <Layer type={LAYER_LINE_TYPE}>
              <Feature coordinates={line} />
            </Layer>
          </MapContainer>
        </Box>
      </div>
    );
  }
}
