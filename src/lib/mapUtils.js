import { along, lineDistance, lineString } from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import {
  FEATURE_COLLECTION_TYPE,
  FEATURE_TYPE,
  GEOMETRY_POINT_TYPE,
} from './constants';

/**
 * fit map view port to contain and zoom to specific shape
 * @param map
 * @param shape
 */
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

/**
 * create a map feature and mutate new object that can be used in maps and feature collection
 * @param item
 * @param geometryType
 * @param coordinates
 * @returns {{geometry: {coordinates: *, type: *}, type: *, properties}}
 */
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

/**
 * create feature collection from array of data
 * @param items
 * @param geometryType
 * @returns {{features: *, type: *}}
 */
export const createFeatureCollection = (items, geometryType) => {
  return {
    type: FEATURE_COLLECTION_TYPE,
    features: items.map(item =>
      createFeature(item, geometryType, item.coordinates),
    ),
  };
};

/**
 * calculate an arc that make marker movement on map smooth
 * @param lineCoords
 * @param distanceOptions
 * @param steps
 * @returns {[]}
 */
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

/**
 * adding new Geo JSON layer to the associated map
 * @param map
 * @param sourceOptions
 * @param layerOptions
 */
export const addGeoJSONLayer = ({ map, sourceOptions, layerOptions }) => {
  map.addSource(sourceOptions.name, {
    type: 'geojson',
    data: sourceOptions.data,
  });
  map.addLayer({ ...layerOptions });
};
