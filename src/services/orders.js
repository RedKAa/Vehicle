import request from '@/utils/requestServer';

export const getOrders = (params) =>
  request.get('/orders', {
    params,
  });

  export const getOrderById = (orderId) => request.get(`/orders/${orderId}`);