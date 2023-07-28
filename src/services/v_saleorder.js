
import request from '@/utils/requestServer';

export const searchSaleorderById = (id) => {
  return request.get('/saleorders', {
    params: {
      'id': id,
      'ApprovalStatus': 'Approved',
    },
    useCache: true,
  });
};

export const createSaleorder = (saleorder) => {
  return request.post(`/saleorders`, {
    data: {
      ...saleorder
    },
  });
}

export const getSaleorderById = (id) =>{
  return request.get(`/saleorders/${id}`);
}

export const getTransactionLineByTid = (id) => {
  return request.get(`/transactionlines`, {
    params: {
      TransactionId: id
    },
  });
}

export const updateSaleorderById = (id, saleorder) => {
  return request.put(`/saleorders/${id}`, {
    data: {
      ...saleorder
    },
  });
}

export const deleteSOById = (id) =>{
  return request.delete(`/saleorders/${id}`);
}
