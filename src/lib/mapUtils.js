import { along, lineDistance, lineString } from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import {
  FEATURE_COLLECTION_TYPE,
  FEATURE_TYPE,
  GEOMETRY_POINT_TYPE,
} from './constants';

export const fitBounds = (map, shape) => {
  const startBounds = new mapboxgl.LngLatBounds();
  startBounds.extend(shape[0]);
  const bounds = shape.reduce((newBounds, coord) => {
    return newBounds.extend(coord);
  }, startBounds);

  map.fitBounds(bounds, {
    padding: 20,
    duration: 0,
  });
};

export const createFeature = (
  item,
  geometryType = GEOMETRY_POINT_TYPE,
  coordinates = [0, 0],
) => {
  return {
    type: FEATURE_TYPE,
    properties: { ...item },
    geometry: {
      type: geometryType,
      coordinates,
    },
  };
};

export const createFeatureCollection = (items, geometryType) => {
  return {
    type: FEATURE_COLLECTION_TYPE,
    features: items.map(item =>
      createFeature(item, geometryType, item.coordinates),
    ),
  };
};

export const calculateSmoothRouteArc = (
  lineCoords,
  { distanceOptions, steps },
) => {
  const arc = [];
  const line = lineString(lineCoords); // our array of lat/lngs
  const distance = lineDistance(line, distanceOptions);
  for (let i = 0; i < distance; i += distance / steps) {
    const segment = along(line, i, distanceOptions);
    arc.push(segment.geometry.coordinates);
  }

  return arc;
};

export const addGeoJSONLayer = ({ map, sourceOptions, layerOptions }) => {
  map.addSource(sourceOptions.name, {
    type: 'geojson',
    data: sourceOptions.data,
  });
  map.addLayer({ ...layerOptions });
};
