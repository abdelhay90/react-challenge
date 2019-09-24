import localforage from 'localforage';
import { trip, passengers } from './mock';

window.localforage = localforage;

/**
 * returns all trips saved on the browser cache
 * @returns {Promise<unknown>}
 */
const getAllTrips = async () => {
  const items = await localforage.getItem('trips');
  if (items === null) await localforage.setItem('trips', [trip]);
  return items || [];
};

/**
 * returns all passengers found in the browser cache
 * @returns {Promise<unknown>}
 */
const getAllPassengers = async () => {
  const items = await localforage.getItem('passengers');
  if (items === null) await localforage.setItem('passengers', [...passengers]);
  return items || [];
};

export default {
  /**
   * add new trip to existing trip list on cache
   * @param item
   * @returns {Promise<{id: *}>}
   */
  async addTrip(item) {
    const items = await getAllTrips();
    const newItem = { ...item, id: Date.now() };
    await localforage.setItem('trips', [...items, newItem]);
    return newItem;
  },

  /**
   * get all trips
   * @returns {Promise<unknown>}
   */
  async getAllTrips() {
    const trips = await getAllTrips();
    return trips;
  },

  /**
   * delete existing trip
   * @param id
   * @returns {Promise<void>}
   */
  async deleteTrip({ id }) {
    const items = await getAllTrips();
    await localforage.setItem('trips', items.filter(item => item.id !== id));
  },

  /**
   * update existing trip
   * @param updatedItem
   * @returns {Promise<void>}
   */
  async updateTrip(updatedItem) {
    const items = await getAllTrips();
    await localforage.setItem(
      'trips',
      items.map(item => {
        if (item.id === updatedItem.id) return { ...item, ...updatedItem };
        return item;
      }),
    );
  },

  /**
   * get all passengers in cache
   * @returns {Promise<unknown>}
   */
  async getAllPassengers() {
    const newPassengers = await getAllPassengers();
    return newPassengers;
  },

  /**
   * add new passengers to existing passengers list on cache
   * @param item
   * @returns {Promise<{id: *}>}
   */
  async addPassenger(item) {
    const items = await getAllPassengers();
    const newItem = { ...item, id: Date.now() };
    await localforage.setItem('passengers', [...items, newItem]);
    return newItem;
  },
};
