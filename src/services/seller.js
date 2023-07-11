import request from '@/utils/requestServer';
export const getAvailableSellersByName = (name) => {
    return request.get('/sellers', {
      params: {
        'SellerName': name,
        'status': 'Active'
      },
      useCache: true,
    });
  };

export const updateSeller = (sellerId, data) => request.put(`/sellers/${sellerId}`, { data });