
import request from '@/utils/requestServer';

export const createTransferorder = (saleorder) => {
  return request.post(`/transferorders`, {
    data: {
      ...saleorder
    },
  });
}

export const getTransferorderById = (id) =>{
  return request.get(`/transferorders/${id}`);
}

export const getTransactionLineByTid = (id) => {
  return request.get(`/transactionlines`, {
    params: {
      TransactionId: id
    },
  });
}

export const updateTransferorderById = (id, saleorder) => {
  return request.put(`/transferorders/${id}`, {
    data: {
      ...saleorder,
      request : "Xuat Kho"
    },
  });
}
