import localforage from 'localforage';

window.localforage = localforage;

const getAll = async () => {
  const items = await localforage.getItem('trips');
  if (!items) await localforage.setItem('trips', []);
  return items || [];
};

export default {
  async add(item) {
    const items = await getAll();
    const newItem = { ...item, id: Date.now() };
    localforage.setItem('trips', [...items, newItem]);
    return newItem;
  },

  async getAll() {
    return await getAll();
  },

  async delete({ id }) {
    const items = await getAll();
    localforage.setItem('trips', items.filter(item => item.id !== id));
  },

  async update(updatedItem) {
    const items = await getAll();
    localforage.setItem(
      'trips',
      items.map(item => {
        if (item.id === updatedItem.id) return { ...item, ...updatedItem };
        return item;
      }),
    );
  },
};
