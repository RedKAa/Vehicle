import request from '@/utils/requestServer';
import { saveCollections } from '@/utils/utils';

export const getLocations = (storeId = 150) => {
  return request.get(`/locations`).then((res) => res.data);
};

export const addLocationToStore = (location) => {
  return request.post(`/locations`, { data: location });
};

export const updateLocation = (locationId, location) => {
  return request.put(`/locations/${locationId}`, { data: location });
};

export const deleteLocationFromStore = (locationId) => {
  return request.delete(`/locations/${locationId}`);
};

export const getStore = (searchValue) => {
  return request.get(`/stores`, { useCache: true, ...searchValue });
};

export const createStore = (storeData) => {
  return request.post(`/stores`, { data: storeData });
};

export const syncProductOfStore = (storeId) => {
  return request.get(`/stores/${storeId}/sync-product`);
};

export const syncPromotionOfStore = (storeId) => {
  return request.get(`/stores/${storeId}/sync-promotion`);
};

export const updateStore = (storeId, storeData) => {
  return request.put(`/stores/${storeId}`, { data: storeData });
};

export const deleteStore = (storeId) => {
  return request.delete(`/stores/${storeId}`);
};

export const getCollections = () => {
  return request.get('/collections', { useCache: true }).then((res) => {
    saveCollections(res.data);
    return res;
  });
};
