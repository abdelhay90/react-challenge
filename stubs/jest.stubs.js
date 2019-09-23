/**
 * used to stub components not found while running tests
 */

/**
 * stub the URL.createObjectUrl because it is not found in JSDOM used in jest
 * the affected component if not stubbed the react-map-gl library
 */
if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = () => {
    // Do nothing
    // Mock this function for mapbox-gl to work
  };
}
