import request from '@/utils/requestServer';

export const getOrderDetail = (supplierId, orderId) =>
  request.get(`/suppliers/${supplierId}/orders/${orderId}`);
export const removeSupplier = (supplierId) => request.delete(`/suppliers/${supplierId}`);
