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

// 30.1 seconds, the .1 is to allow a buffer for the next set of cords to load
export const ANIMATION_STEPS = 30100;
