export const MAP_TOKEN =
  'pk.eyJ1IjoiYWhtZWQtYWJkZWxoYXkiLCJhIjoiY2swb2lkeGcyMGE1dDNlcnV3bzYyeXBqYSJ9.n0kF9SCChITXNQispwGnYQ';
export const FEATURE_COLLECTION_TYPE = 'FeatureCollection';
export const FEATURE_TYPE = 'Feature';
export const GEOMETRY_POINT_TYPE = 'Point';
export const GEOMETRY_LINE_TYPE = 'LineString';
export const LAYER_LINE_TYPE = 'line';
export const LAYER_CIRCLE_TYPE = 'circle';
export const LAYER_SYMBOL_TYPE = 'symbol';

export const DEFAULT_LAYER_CIRCLE_PAINT = {
  'circle-color': '#ff5200',
  'circle-stroke-width': 1,
  'circle-stroke-color': '#fff',
  'circle-stroke-opacity': 1,
};

export const DEFAULT_LAYER_LINE_PAINT = {
  'line-width': 2,
  'line-color': '#007cbf',
};

export const DEFAULT_LAYER_SYMBOL_BUS_PAINT = {
  'icon-image': 'airport-15',
  'icon-rotate': ['get', 'bearing'],
  'icon-rotation-alignment': 'map',
  'icon-allow-overlap': true,
  'icon-ignore-placement': true,
};

// 30.1 seconds, the .1 is to allow a buffer for the next set of cords to load
export const ANIMATION_STEPS = 30100;

export const TRIP_STATUS = {
  STARTED: 'STARTED',
  NOT_STARTED: 'NOT_STARTED',
  FINISHED: 'FINISHED',
  IN_PROGRESS: 'IN_PROGRESS',
};

export const PAYMENT_METHOD = {
  CASH: 'CASH',
  CREDIT: 'CREDIT',
};

export const PASSENGER_STATUS = {
  WAITING: 'WAITING',
  CHECKED_IN: 'CHECKED_IN',
  MISSED: 'MISSED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
};
