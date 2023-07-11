import { PRODUCT_MASTER } from '@/utils/constraints';
import request from '@/utils/requestServer';

export const createProduct = (prod) => {
  return request.post('/products', {
    data: prod,
  });
};

export const deleteProduct = (productId) => {
  return request.delete(`/products/${productId}`);
};

export const getProductDetail = (productId) => {
  return request.get(`/products`, {
    params: {
      'product-id': productId,
      fields: ['combos', 'extra_group', 'collections', 'extras'],
    },
  });
};

export const updateProduct = (productId, prod) => {
  return request.put(`/products/${productId}`, {
    data: prod,
  });
};

export const getAllProduct = (filters) => {
  return request.get('/products', {
    params: filters,
  });
};

export const getAllAreaProduct = (filters) => {
  return request.get('/areas/products', {
    params: filters,
  });
};

export const getAllProductMaster = (productName) => {
  return request.get('/products', {
    params: { 'product-type': PRODUCT_MASTER, 'product-name': productName },
  });
};

export const getBestSellerProduct = () => {
  return request.get(`/products/best-sellers`, {
    params: {
      fields: ['combos', 'extra_group', 'collections'],
    },
  });
};

export const getProductByName = (name) => {
  return request.get('/products', {
    params: {
      'product-name': name,
    },
  });
};

export const getBSPByCollection = (collectionID) => {
  return request.get(`/products`, {
    params: {
      'collection-id': [collectionID],
    },
  });
};
