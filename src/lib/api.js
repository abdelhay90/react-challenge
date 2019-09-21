import localforage from 'localforage';
import { trip, passengers } from './mock';

window.localforage = localforage;

const getAllTrips = async () => {
  const items = await localforage.getItem('trips');
  if (!items) await localforage.setItem('trips', [trip]);
  return items || [];
};

const getAllPassengers = async () => {
  const items = await localforage.getItem('passengers');
  if (!items) await localforage.setItem('passengers', [...passengers]);
  return items || [];
};

export default {
  async addTrip(item) {
    const items = await getAllTrips();
    const newItem = { ...item, id: Date.now() };
    await localforage.setItem('trips', [...items, newItem]);
    return newItem;
  },

  async getAllTrips() {
    const trips = await getAllTrips();
    return trips;
  },

  async deleteTrip({ id }) {
    const items = await getAllTrips();
    await localforage.setItem('trips', items.filter(item => item.id !== id));
  },

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

  async getAllPassengers() {
    const newPassengers = await getAllPassengers();
    return newPassengers;
  },
};
