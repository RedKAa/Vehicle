import request from '@/utils/requestServer';

export const createStoreOfSupplier = (supplerId, data) => {
  return request.post(`/suppliers/${supplerId}/stores`, { data });
};

export const deleteStoreOfSupplier = (supplerId, storeId) => {
  return request.delete(`/suppliers/${supplerId}/stores/${storeId}`);
};

export const updateStoreOfSupplier = (supplerId, storeId, data) => {
  return request.put(`/suppliers/${supplerId}/stores/${storeId}`, { data });
};

export const createSupplier = (data) => {
  return request.post('/suppliers', { data });
};

export const updateSupplier = (supplierId, data) => {
  return request.put(`/suppliers/${supplierId}`, { data });
};

export const getSuppliers = () => {
  return request.get('/suppliers', { useCache: true });
};

export const getStoreOfSuppliers = (supplierId, params) => {
  return request.get(`/suppliers/${supplierId}/stores`, { useCache: true, params });
};
