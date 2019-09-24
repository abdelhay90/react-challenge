import Api from '../../lib/api';
import { trip } from '../../lib/mock';

describe('Api', () => {
  it('should return all trips in cache', async () => {
    await Api.addTrip({ id: '123456789' });
    await Api.addTrip({ id: '1234567' });
    const allTrips = await Api.getAllTrips();
    expect(allTrips).toHaveLength(2);
  });

  it('should add new trip to cache', async () => {
    await Api.addTrip({ id: '12345' });
    const allTrips = await Api.getAllTrips();
    expect(allTrips).toHaveLength(3);
  });

  it('should delete existing trip to cache', async () => {
    const allTrips = await Api.getAllTrips();
    await Api.deleteTrip(allTrips[0]);
    const allNewTrips = await Api.getAllTrips();
    expect(allNewTrips).toHaveLength(1);
  });

  it('should update existing trip to cache', async () => {
    const allTrips = await Api.getAllTrips();
    await Api.updateTrip({ ...allTrips[0], name: 'hello' });
    const allNewTrips = await Api.getAllTrips();
    const filtered = allNewTrips.filter(item => allTrips[0].id === item.id);
    expect(filtered[0].name).toEqual('hello');
  });

  it('should get all passengers in cache', async () => {
    await Api.addPassenger({ id: '1234567' });
    const allPassengers = await Api.getAllPassengers();
    expect(allPassengers).toHaveLength(1);
  });
});
