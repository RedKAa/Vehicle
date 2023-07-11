import { BESTSELLER_COLLECTION, SUGGESTED_DISHES } from '@/utils/constraints';
import request from '@/utils/requestServer';

export const getCollection = () => {
  return request.get('/collections', { useCache: true });
};

export const getSuggestDishes = () => {
  return request
    .get('/collections', {
      params: {
        type: SUGGESTED_DISHES,
      },
      useCache: true,
    })
    .then(({ data }) => {
      // CHi lay thang suggested dishes dau tien
      if (data && data.length > 0) {
        return data[0];
      }
    });
};

export const getBestSellerCollection = () => {
  return request
    .get('/collections', {
      params: {
        type: BESTSELLER_COLLECTION,
      },
      useCache: true,
    })
    .then(({ data }) => {
      // CHi lay thang bestseller collection dau tien
      if (data && data.length > 0) {
        return data[0];
      }
    });
};

export const addProductIntoCollection = (idCollection, body) => {
  return request.post(`/collections/${idCollection}/products`, { data: body });
};

export const deleteCollection = (idCollecion, body) => {
  return request.delete(`/collections/${idCollecion}/products`, { data: body });
};

export const deleteACollection = (idCollecion) => {
  return request.delete(`/collections/${idCollecion}`);
};

export const deleteCollections = (idCollections) => {
  return request.delete(`/collections/`, {
    data: idCollections,
  });
};

export const addCollection = (collection) => {
  return request.post(`/collections`, {
    data: collection,
  });
};

export const updateCollection = (collection) => {
  return request.put(`/collections/${collection.id}`, {
    data: collection,
  });
};
