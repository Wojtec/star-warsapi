import NodeCache from "node-cache"; // Import node cache from package.

// Set time 24 hours for cache mechanism.
const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });
// Method get cache with two parameters, key and callback storefunction.
export const getCache = async (
  key: string | number,
  storeFunction: Function
) => {
  // Get data from cache by key parameter.
  const value = await cache.get(key);
  // If value is true return data from cache.
  if (value) {
    return value;
  }
  // If cache doesn't have data, call a callback to get data and store in cache.
  const store = await storeFunction();
  if (store) {
    cache.set(key, store);
    return store;
  }
};
// Del data from cache by key.
export const del = (keys: string) => {
  cache.del(keys);
};
// Delete all data from cache.
export const flush = () => {
  cache.flushAll();
};
