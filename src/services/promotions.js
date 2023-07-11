import request from '@/utils/requestServer'

export const getPromotion = () => {
  return request.get(`/promotions/all`, { useCache: true });
};
